import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { create } from 'react-test-renderer';

import MyComponent from '..';

console.error = jest.fn();

beforeEach(() => {
    console.error.mockClear();
});

const renderComponent = (props?: React.ComponentProps<typeof MyComponent>) => render(<MyComponent {...props} />);

describe('Component', () => {
    it('render properly', () => {
        expect(() => {
            const { queryByTestId } = renderComponent({ myProp: <span data-testid="children">mars</span> });

            expect(console.error).not.toBeCalled();
            expect(queryByTestId('children')).toBeInTheDocument();
        }).not.toThrowError();
    });

    it('validates props', () => {
        expect(() => renderComponent({ myProp: { not: 'a react node' } })).toThrowError();
    });

    it('matches the snapshot', () => {
        const componentSnapshoot = create(<MyComponent />).toJSON();
        expect(componentSnapshoot).toMatchSnapshot();
    });
});
