import { PureComponent } from 'react';

import SensorPage from './SensorPage.component';


export class SensorPageContainer extends PureComponent {
    containerProps = () => {}

    containerFunctions = {};

    render() {
        return (
            <SensorPage
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default SensorPageContainer;
 