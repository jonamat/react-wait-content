import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { create } from 'react-test-renderer';

import { Defer } from '..';

const consoleError = jest.fn();
Object.defineProperty(console, 'error', {
    get() {
        return consoleError;
    },
});

const readyState = jest.fn().mockImplementation(() => 'complete');
Object.defineProperty(document, 'readyState', {
    get() {
        return readyState;
    },
});

beforeEach(() => {
    consoleError.mockClear();
    readyState.mockClear();
});

const renderComponent = (props?: React.ComponentProps<typeof Defer>, opt?: Omit<RenderOptions, 'queries'>) =>
    render(<Defer {...props} />, opt);

describe('Component', () => {
    it('render properly', () => {
        expect(() => {
            const { queryByTestId } = renderComponent({ children: <div data-testid="children" /> });

            expect(consoleError).not.toBeCalled();
            expect(queryByTestId('children')).toBeInTheDocument();
        }).not.toThrowError();
    });

    it('validates props', () => {
        /** Props that generate non-blocking error */
        renderComponent({ trigger: 'something strange' });
        renderComponent({ timeout: 'not a number' });
        renderComponent({ fallback: { something: 'wrong' } });
        renderComponent({ onRender: 'not a function' });

        expect(consoleError).toBeCalledTimes(6); // Consider Delay component errors

        /** Props that generate blocking error */
        expect(() => renderComponent({ children: { something: 'wrong' } })).toThrowError();
    });

    it('return fallback on loading', () => {
        readyState.mockImplementation(() => 'loading');

        const { queryByTestId } = renderComponent({
            trigger: 'pageLoaded',
            fallback: <div data-testid="fallback" />,
            children: <div data-testid="children" />,
        });

        expect(queryByTestId('children')).not.toBeInTheDocument();
        expect(queryByTestId('fallback')).toBeInTheDocument();
    });

    it('return children on "interactive" state (DOM content loaded)', () => {
        readyState.mockImplementation(() => 'interactive');

        const { queryByTestId } = renderComponent({
            trigger: 'domLoaded',
            fallback: <div data-testid="fallback" />,
            children: <div data-testid="children" />,
        });

        expect(queryByTestId('fallback')).not.toBeInTheDocument();
        expect(queryByTestId('children')).toBeInTheDocument();
    });

    it('return children on "complete" state (load event fired)', () => {
        readyState.mockImplementation(() => 'complete');

        const { queryByTestId } = renderComponent({
            trigger: 'pageLoaded',
            fallback: <div data-testid="fallback" />,
            children: <div data-testid="children" />,
        });

        expect(queryByTestId('children')).toBeInTheDocument();
    });

    it('clear listeners at unmount', () => {
        readyState.mockImplementation(() => 'loading');
        const { unmount } = renderComponent({ timeout: 1000 });
        unmount();
        expect(consoleError).not.toBeCalled();
    });

    it('matches the snapshot', () => {
        readyState.mockImplementation(() => 'loading');
        const fallbackSnapshoot = create(
            <Defer trigger="pageLoaded" fallback={<div>fallback snapshot</div>} />,
        ).toJSON();

        expect(fallbackSnapshoot).toMatchSnapshot();

        readyState.mockImplementation(() => 'complete');
        const childSnapshoot = create(
            <Defer>
                <div>child snapshot</div>
            </Defer>,
        ).toJSON();

        expect(childSnapshoot).toMatchSnapshot();
    });
});
