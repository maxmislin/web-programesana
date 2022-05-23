import { PureComponent } from 'react';

import Header from './Header.component';

export class HeaderContainer extends PureComponent {
    containerProps = () => {
        const { location } = this.props;

        return {
            location
        };
    }

    containerFunctions = {};

    render() {
        return (
            <Header
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default HeaderContainer;
 