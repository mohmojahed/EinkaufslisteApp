class ArtikelTag extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false,
            newName: this.props.artikel.name
        }
    }

    handleChange(event) {
        this.setState({newName: event.target.value})
    }

    artikelUmbenennen(artikel, event) {
        if (event && event.key != "Enter") return
        artikel.name = this.state.newName
        this.setState({isEditing: false})
    }

    render() {
        const artikel = this.props.artikel

        const viewTemplate = (
            <dd>
                <label><input type="checkbox" checked={artikel.gekauft}
                              onChange={() => this.props.checkHandler(this.props.artikel)}/>
                    {artikel.gekauft ? <s>{artikel.name}</s> : artikel.name}
                </label>
                <i className="material-icons"
                   onClick={() => this.setState({isEditing: true})}>edit </i>
                <i className="material-icons"
                   onClick={this.props.deleteHandler}>delete </i>
            </dd>
        )

        const editTemplate = (
            <dd>
                <input type="search" value={this.state.newName} autoFocus={true}
                       onChange={event => this.handleChange(event)}
                       onKeyPress={event => this.artikelUmbenennen(artikel, event)}/>
                <i className="material-icons"
                   onClick={() => this.setState({isEditing: false})}>cancel </i>
                <i className="material-icons"
                   onClick={() => this.artikelUmbenennen(artikel)}>check_circle </i>
            </dd>
        )

        return (
            this.state.isEditing
                ? editTemplate
                : viewTemplate
        )
    }
}
