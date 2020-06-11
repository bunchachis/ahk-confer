import React from "react"
import {Button, DropdownToggle, Dropdown, DropdownMenu, Input} from "reactstrap"
import {library} from "@fortawesome/fontawesome-svg-core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {fas} from "@fortawesome/free-solid-svg-icons"

library.add(fas)

export default class IconPicker extends React.PureComponent {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this);
    this.searchIconHandler = this.searchIconHandler.bind(this);
    this.pickIconHandler = this.pickIconHandler.bind(this);

    this.state = {
      dropdownOpen: false,
      icons: {...fas},
      search: '',
    }
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  searchIconHandler(event) {
    this.setState({
      search: event.target.value
    })
  }

  pickIconHandler(icon) {
    this.toggle()
    this.props.onChange(icon.iconName)
  }

  render() {
    const styles = {
      iconContainer: {
        width: '400px',
        height: '400px',
        overflow: 'scroll',
        padding: '8px'
      },
      iconSearchInput: {
        margin: '0 0 5px 0'
      }
    }

    const iconLists = (this.state.dropdownOpen ? Object.keys(this.state.icons) : [])
      .filter(key => key !== "faFontAwesomeLogoFull" && this.state.icons[key].iconName.includes(this.state.search))
      .map(key => {
        const icon = this.state.icons[key]
        return <Button key={key} onClick={() => this.pickIconHandler(icon)}>
          <FontAwesomeIcon icon={[icon.prefix, icon.iconName]}/>
        </Button>
      })

    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} size="lg">
        <DropdownToggle color="outline-secondary" style={{height: 85, width: 85}}>
          {this.props.value ? <FontAwesomeIcon icon={['fas', this.props.value]} style={{fontSize: 35}}/> : "Icon"}
        </DropdownToggle>
        <DropdownMenu style={{...styles.iconContainer, width: 350}} className="icon-list">
          <Input type="text" name="icon" placeholder="Search Icon" value={this.state.search}
                 onChange={this.searchIconHandler} style={styles.iconSearchInput} />
          <Button className="remove" onClick={() => this.pickIconHandler({iconName: null})}>
            <FontAwesomeIcon icon="eraser" />
          </Button>
          {iconLists}
        </DropdownMenu>
      </Dropdown>
    );
  }
}