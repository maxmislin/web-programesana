import { PureComponent } from 'react';


export class Header extends PureComponent {
    render() {
        const pathname = window.location.pathname;

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <ul className="navbar-nav mr-auto">
                        <li className={ pathname === '/' || pathname.includes('sensor') ? 'nav-item active' : 'nav-item' }>
                            <a className="nav-link" href="/">Sensors</a>
                        </li>
                        <li className={ pathname === '/rooms' || pathname.includes('room') ? 'nav-item active' : 'nav-item' }>
                            <a className="nav-link" href="/rooms">Rooms</a>
                        </li>
                        <li className={ pathname === '/compare' ? 'nav-item active' : 'nav-item' }>
                            <a className="nav-link" href="/compare">Сompare</a>
                        </li>
                        <li className={ pathname === '/notifications' ? 'nav-item active' : 'nav-item' }>
                            <a className="nav-link" href="/notifications">Notifications</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;
 