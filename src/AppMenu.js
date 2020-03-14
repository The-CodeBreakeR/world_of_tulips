import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import AppBody from './AppBody'


class AppMenu extends Component {
    state = { activeItem: 'Market' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state
        return (
            <div>
                <Menu attached='top' tabular>
                    <Menu.Item
                        name='Market'
                        active={activeItem === 'Market'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='Garden'
                        active={activeItem === 'Garden'}
                        onClick={this.handleItemClick}
                    />
                </Menu>

                <Segment attached='bottom'>
                    <AppBody activeItem={activeItem} {...this.props}/>
                </Segment>
            </div>
        )
    }
}

export default AppMenu;
