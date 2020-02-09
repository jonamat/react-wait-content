import React, { FC, ReactNode, useState, ComponentProps, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Delay } from 'react-delay-fallback';

type TriggerEvent = 'bypass' | 'domLoaded' | 'pageLoaded';

export interface DeferProps {
    /** State of the page that triggers the children rendering */
    trigger?: TriggerEvent;
    /** Component to render instead of children while waiting */
    fallback?: ReactNode;
    /** Function to call on rendering */
    onRender?: (...arg: Array<unknown>) => unknown;
    /** Additional delay before the render and after the trigger */
    timeout?: number;
    children?: ReactNode;
}

// Render inside Delay for additional waiting & fire onRender meth
const acrossDelay = (props?: ComponentProps<typeof Delay>) => <Delay {...props} />;

/** React component to postpone children rendering to a determined load state of the page (DOM loaded or fully loaded)
 *  with optional additional delay. See [Docs](https://github.com/jonamat/react-wait-content). */
export const Defer: FC<DeferProps> = ({ children, fallback, onRender, timeout = 0, trigger = 'bypass' }) => {
    const [status, setStatus] = useState<'complete' | 'interactive' | 'loading'>(document.readyState);
    const render = () => acrossDelay({ timeout, fallback, children, onRender });

    if (status === 'loading') document.addEventListener('DOMContentLoaded', () => setStatus('interactive'));
    if (status === 'interactive') window.addEventListener('load', () => setStatus('complete'));

    // Remove event listeners at unmounting
    useEffect(
        () => () => {
            document.removeEventListener('DOMContentLoaded', () => setStatus('interactive'));
            window.removeEventListener('load', () => setStatus('complete'));
        },
        [],
    );

    if (trigger !== 'bypass' && trigger !== 'domLoaded' && trigger !== 'pageLoaded') {
        trigger = 'bypass';
        console.error('Invalid prop. Trigger must be "bypass", "domLoaded", "pageLoaded"');
    }

    switch (trigger) {
        case 'bypass':
            return render();

        // status === 'complete' colud be fired before or during the virtual DOM evautation
        case 'domLoaded':
            return status === 'interactive' || status === 'complete' ? render() : <>{fallback}</>;

        case 'pageLoaded':
            return status === 'complete' ? render() : <>{fallback}</>;
    }
};

Defer.propTypes = {
    trigger: PropTypes.oneOf(['bypass', 'domLoaded', 'pageLoaded']),
    fallback: PropTypes.node,
    onRender: PropTypes.func,
    timeout: PropTypes.number,
    children: PropTypes.node,
};
