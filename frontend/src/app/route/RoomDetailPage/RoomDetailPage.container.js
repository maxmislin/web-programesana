import { PureComponent } from 'react';

import RoomDetailPage from './RoomDetailPage.component';
import { getRooms, getSensors, addRoom, getTypes, addSensor } from '../../util/API/endpoint/Sensor';
import { upload } from '../../util/API/endpoint/Upload';
import { withRouter } from "react-router";

export class RoomDetailPageContainer extends PureComponent {
    initialState = {
        sensor_x_coord: 0,
        sensor_y_coord: 0,
        new_sensor_name: '',
        selectedType: 0
    }

    state = {
        rooms: [],
        sensors: [],
        new_room_name: '',
        file_url: '',
        isAddNewRoom: false,
        isAddNewSensor: false,
        file: null,
        ...this.initialState
    }

    containerProps = () => {
        const {
            rooms,
            sensors,
            new_room_name,
            isAddNewRoom,
            file_url,
            selectedType,
            sensorTypes,
            new_sensor_name,
            isAddNewSensor
        } = this.state;

        return {
            rooms,
            sensors,
            new_room_name,
            isAddNewRoom,
            file_url,
            selectedType,
            sensorTypes,
            new_sensor_name,
            isAddNewSensor
        };
    }

    containerFunctions = {
        setContainerState: this.setContainerState.bind(this),
        handleChange: this.handleChange.bind(this),
        onSaveClick: this.onSaveClick.bind(this),
        onImageClick: this.onImageClick.bind(this),
        onSensorSave: this.onSensorSave.bind(this)
    };

    componentDidMount() {
        const { match: { params: { id } = {} } = {}  } = this.props;

        getRooms(id).then(({ data: { rooms } = {} }) => this.setState({ rooms }));
        getTypes().then(({ data: { sensorTypes } = {} }) => this.setState({ sensorTypes }));
        getSensors(id).then(({ data: { sensors } = {} }) => this.setState({ sensors }));
    }

    componentDidUpdate(prevProps, prevState) {
        const { isAddNewSensor } = this.props;
        const { isAddNewSensor: prevIsAddNewSensor } = prevProps;

        if (prevIsAddNewSensor !== isAddNewSensor && !isAddNewSensor) {
            this.setState(this.initialState);
        } 
    }

    onImageClick(e) {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left; //x position within the element.
        const y = e.clientY - rect.top;
        const width = rect.width;
        const height = rect.height;

        const sensor_x_coord = parseInt(x/width * 100);
        const sensor_y_coord = parseInt(y/height * 100);

        this.setState({
            sensor_x_coord,
            sensor_y_coord,
            isAddNewSensor: true
        });
    }

    onSensorSave() {
        const {
            new_sensor_name,
            sensor_x_coord,
            sensor_y_coord,
            selectedType,
            rooms: [{ id } = {}] = [],
        } = this.state;
        
        addSensor({
            name: new_sensor_name,
            sensor_code: new_sensor_name,
            sensor_x_coord,
            sensor_y_coord,
            type_id: selectedType,
            room_id: id
        }).then(data => {
            const { data: { sensor } = {} } = data;
            const { sensors } = this.state;

            sensors.push(sensor);
            
            this.setState({
                sensors,
                isAddNewSensor: false
            });
        })
    }

    handleChange(event) {
        this.setState({
          file_url: URL.createObjectURL(event.target.files[0]),
          file: event.target.files[0]
        })
    }

    onSaveClick() {
        const { new_room_name } = this.state;
        
        addRoom({
            name: new_room_name,
            room_code: new_room_name
        }).then(data => {
            const { data: { room: { id, name } = {} } = {} } = data;

            this.uploadImages(id, name);
        })
    }

    uploadImages(refId, name) {
        const { history } = this.props;

        const { file } = this.state; 
        const formData = new FormData();

        formData.append('ref', 'plugin::sensor.room');
        formData.append('refId', refId);
        formData.append('field', 'room_image');
        formData.append('files', file)

        upload(formData).then(() => {
            history.push(`/rooms/${refId}`);
            document.location.reload();
        });
    }

    setContainerState(name, value) {
        this.setState({ [name]: value });
    }

    render() {
        console.log(this.props);
        return (
            <RoomDetailPage
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default withRouter(RoomDetailPageContainer);
 