import { PureComponent } from 'react';

import './RoomDetailPage.style.scss';


export class RoomDetailPage extends PureComponent {
    state = {
        imageWidth: 0,
        imageHeight: 0
    }

    componentDidMount() {
        const imageElem = document.getElementById('roomImageWithSensors');

        this.setState({
            imageWidth: imageElem.offsetWidth,
            imageHeight: imageElem.offsetHeight
        });
    }

    componentDidUpdate() {
        const { imageWidth, imageHeight } = this.state;
        const imageElem = document.getElementById('roomImageWithSensors');

        if (!imageWidth && !imageHeight) {
            this.setState({
                imageWidth: imageElem.offsetWidth,
                imageHeight: imageElem.offsetHeight
            });
        }
    }

    renderInputs() {
        const {
            setContainerState,
            new_room_name
        } = this.props;

        return (
            <div className="RoomDetailPage-Inputs">
                <div className="RoomDetailPage-InputContainer">
                    <div className="RoomDetailPage-InputLabel">Room name:</div>
                    <input type="text" value={new_room_name} onChange={(e) => setContainerState('new_room_name', e.target.value)} />
                </div>
                <button onClick={() => setContainerState('isAddNewRoom', true) } className="btn btn-primary">Add new room</button>
            </div>
        );
    }

    renderRooom() {
        const { rooms, onImageClick } = this.props;
        const [{ name, room_image: { url } = {}, id } = {}] = rooms;

        return (
            <div>
                <div className="RoomsPage-RoomsName">{ name }</div>
                <div>{ `ID: ${id}`}</div>
                <div className="RoomDetailPage-ImageContainer">
                    <img onClick={onImageClick} alt="roomImage" id="roomImageWithSensors" src={ `http://localhost:1337${url}` } />
                    { this.renderSensors() }
                </div>
            </div>
        )
    }

    renderSensors() {
        const { sensors } = this.props;
        const { imageHeight, imageWidth } = this.state;

        if (!imageHeight && !imageWidth) return null;

        return (
            <>
                { sensors.map((sensor) => {
                    const { name, sensor_x_coord, sensor_y_coord, id } = sensor;;

                    const top = imageHeight * (sensor_y_coord/100);
                    const left = imageWidth * (sensor_x_coord/100);

                    return (
                        <a href={ `/sensor/${id}`} className="RoomDetailPage-Sensor" style={{ top: `${top}px`, left: `${left}px` }}>
                            { name }
                        </a>
                    )
                }) }
            </>
        );
    }

    renderAddRoom() {
        const {
            setContainerState,
            new_room_name,
            onSaveClick,
            handleChange,
            file_url
        } = this.props;

        return (
            <div className="RoomDetailPage-AddRoomInputs">
                <div className="RoomDetailPage-InputContainer">
                    <div className="RoomDetailPage-InputLabel">Room name:</div>
                    <input type="text" value={new_room_name} onChange={(e) => setContainerState('new_room_name', e.target.value)} />
                </div>
                <div className="RoomDetailPage-InputContainer">
                    <div className="RoomDetailPage-InputLabel">Room plan:</div>
                    <input type="file" id="myFile" name="filename" onChange={handleChange } />
                </div>
                { file_url && <img alt="uploadedFile" src={ file_url } /> }
                <button onClick={onSaveClick} className="btn btn-primary">Save</button>
            </div>
        );
    }
    
    renderAddSensor() {
        const {
            setContainerState,
            new_sensor_name,
            onSensorSave,
            isAddNewSensor
        } = this.props;

        if (!isAddNewSensor) return <div>To add new sensor click on the place where it should be placed</div>;

        return (
            <div className="RoomDetailPage-AddSensorInputs">
                <div className="RoomDetailPage-InputContainer">
                    <div className="RoomDetailPage-InputLabel">Sensor name:</div>
                    <input type="text" value={new_sensor_name} onChange={(e) => setContainerState('new_sensor_name', e.target.value)} />
                </div>
                { this.renderTypes() }
                <button onClick={onSensorSave} className="btn btn-primary">Save</button>
            </div>
        );
    }

    renderTypes() {
        const { sensorTypes, setContainerState, selectedType } = this.props;

        return (
            <div className="RoomDetailPage-RowData">
                { sensorTypes.map((type) => {
                    const { name, id } = type;

                    return (
                        <div className="RoomDetailPage-InputContainer">
                            <input
                              checked={ parseInt(selectedType) === id }
                              onChange={ e => setContainerState('selectedType', e.target.value)}
                              type="radio" id={ id } name="type"
                              value={ id }
                            />
                            <label className="RoomDetailPage-InputLabel" htmlFor={ id }>{ name }</label>
                        </div>
                    ); 
                }) }
            </div>
        );
    }

    render() {
        const { isAddNewRoom, setContainerState, isAddNewSensor }= this.props;

        return (
            <div className="RoomDetailPage">
                { isAddNewRoom || isAddNewSensor ? (
                    <>
                        <button
                          className="btn RoomDetailPage-GoBack"
                          onClick={() => {
                              setContainerState('isAddNewRoom', false)
                              setContainerState('isAddNewSensor', false)
                            } }
                        >
                            Go Back
                        </button>
                        { isAddNewRoom ? this.renderAddRoom() : this.renderAddSensor() }
                    </>
                ) : (
                    <>
                        { this.renderRooom() }
                        { this.renderAddSensor() }
                        { this.renderInputs() }
                    </>
                )}
            </div>
        );
    }
}

export default RoomDetailPage;
 