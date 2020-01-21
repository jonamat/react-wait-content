import React, { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';

interface MyComponentProps {
    /** Inline prop doc example. Default `world` */
    myProp?: ReactNode;
}

/** MyComponent description. See [Docs](https://github.com/jonamat/react-library-boilerplate). */
const MyComponent: FC<MyComponentProps> = ({ myProp = 'world' }) => {
    return <>Hello {myProp}!</>;
};

MyComponent.propTypes = {
    myProp: PropTypes.element,
};

export default MyComponent;
