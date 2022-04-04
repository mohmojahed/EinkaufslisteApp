class GruppenDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            showDialog : this.props.visible,
            gruppenListe : this.props.gruppenListe,
            gruppenId : this.setActiveGruppe,
        }
    }
    static eingabe = document.getElementById("eingabe")
    gruppeHinzufuegen() {
        let eingabe = document.getElementById("eingabe")
        if (eingabe.value.trim().length > 0) {
            App.gruppeHinzufuegen(eingabe.value)
            this.setState({gruppenListe: App.gruppenListe})
        }
        eingabe.value = ""
        eingabe.focus()
    }

    gruppeEntfernen(gruppe) {
        App.gruppeEntfernen(gruppe)
        this.setState({gruppenListe: App.gruppenListe})
    }
    render = () => {
        return(
        <div className={"mdc-dialog mdc-dialog--open"}>
            <div className={"mdc-dialog__container"}>
                <div className={"mdc-dialog__surface"}>
                    <h2 className={"mdc-dialog__title"}> Gruppen bearbeiten </h2>
                    <div className={"mdc-dialog__content"}>
                            <nav>
                                <input type="text" id="eingabe" placeholder="Gruppe hinzufügen"
                                       onKeyUp={event => (event.keyCode == 13) ? this.gruppeHinzufuegen() : ''}/>
                                <button className="material-icons"
                                        onClick={() => this.gruppeHinzufuegen()}>add_circle
                                </button>
                             </nav>
                        <hr/>
                    </div>
                    <div className="mdc-dialog__actions">
                        <button type="button" className="mdc-button mdc-dialog__button"
                                onClick={this.props.onDialogClose}>
                            <div className="mdc-button__ripple"></div>
                            <span className="mdc-button__label">Schließen</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
