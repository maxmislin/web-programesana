import { PureComponent } from 'react';

import './RoomsPage.style.scss'

export class RoomsPage extends PureComponent {
    renderRoom = (room) => {
        const { name, id, room_image = {} } = room;
        const { url = '' } = room_image || {};

        return (
            <a key={id} href={ `/rooms/${id}` } className="RoomsPage-RoomsContainer card">
                <img alt="roomImage" src={ `http://localhost:1337${url}` } />
                <div className="RoomsPage-RoomsName">{ name }</div>
                <div>{ `ID: ${id}`}</div>
            </a>
        )
    }

    renderRooms = () => {
        const { rooms } = this.props;

        return (
            <div className="RoomsPage-RoomsList">
                { rooms.map(this.renderRoom) }
            </div>
        )
    }

    render() {
        return (
            <div className="RoomsPage">
                { this.renderRooms() }
            </div>
        );
    }
}

export default RoomsPage;
 