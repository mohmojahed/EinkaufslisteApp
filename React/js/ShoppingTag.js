/**
 * Hauptkomponentenseite der App
 */
class ShoppingTag extends React.Component {


    constructor(props) {
        super(props);
        /**
         *@type {{showGruppenDialog: boolean,
         * erledigtAufgeklappt: boolean,
         * aktiveGruppe: null,
         * einkaufenAufgeklappt: boolean}}
         */
        this.state = {
            aktiveGruppe : null,
            showGruppenDialog : false,
            einkaufenAufgeklappt: true,
            erledigtAufgeklappt: false
        }
        this.startzustandLaden()
    }
    async startzustandLaden() {
        let gespeicherterZustand = localStorage.getItem(App.STORAGE_KEY)
        if (gespeicherterZustand) {
            App.laden()
        } else {
            await App.datenEinlesen()
            this.setState(this.state)
        }
    }

    /**
     *
     * @param gruppenId
     */


    setAktiveGruppe(gruppenId) {
        App.aktiveGruppe = gruppenId
        const gruppe = App.gruppeFinden(gruppenId)
        App.informieren(`[App] Gruppe "${gruppe.name}" ist nun aktiv`)
        this.setState({aktiveGruppe: App.aktiveGruppe})
    }

    /**
     * Methode, die den Artikel hinzufügt
     */
    artikelHinzufuegen = () => {

        let eingabe = document.getElementById("artikelEingabe")
        if (eingabe.value.trim().length > 0) {
            let aktiveGruppe = App.gruppeFinden(App.aktiveGruppe)
            aktiveGruppe.artikelHinzufuegen(eingabe.value)
            this.setState(this.state)
        }
        eingabe.value = ""
        eingabe.focus()
    }
    /**
     * @param artikel
     * Feststellen, ob der Artikel gekauft wird oder nicht
     */
    artikelChecken = (artikel) => {
        artikel.gekauft = !artikel.gekauft
        const aktion = artikel.gekauft ? "erledigt" : "reaktiviert"
        App.informieren(`[App] Artikel "${artikel.name}" ${aktion}`)
        this.setState({state: this.state})
    }

    /**
     *
     */
    einkaufenAufZuKlappen() {
        this.setState({einkaufenAufgeklappt: !this.state.einkaufenAufgeklappt})
    }

    erledigtAufZuKlappen() {
        this.setState({erledigtAufgeklappt: !this.state.erledigtAufgeklappt})
    }
    gruppenDialogOpen = () => {
        this.setState({showGruppenDialog: !this.state.showGruppenDialog})
    }

    render = () => {
    return (
        <div id= "container" >
          <header>
            <div id="header">
                <div>
                    <h1>Einkaufsliste</h1>
                </div>
                <nav>
                   <input type="search" id={"artikelEingabe"} type="text" placeholder="Artikel hinzufügen"
                   onKeyPress={e => (e.key == 'Enter') ? this.artikelHinzufuegen() : ''}/>
                   <button id={"button3"} onClick={() => this.artikelHinzufuegen()} className="material-icons">add_circle</button>
                </nav>
            <hr/>
            </div>
          </header>
          <main>
            <section>
              <div id="subheader">
                  <h2>Einkaufen
                      <i onClick={() => this.einkaufenAufZuKlappen()} className="material-icons">
                          {this.state.einkaufenAufgeklappt ? 'expand_more' : 'expand_less'}
                      </i>
                  </h2>
              </div>
              <hr/>
              <div id="list container">
                  <dl>
                      {this.state.einkaufenAufgeklappt
                          ? App.gruppenListe.map(gruppe =>
                              <GruppenTag key={gruppe.id} gruppe={gruppe} gekauft={false}
                                          aktiv={gruppe.id == App.aktiveGruppe}
                                          aktiveGruppeHandler={() => this.setAktiveGruppe(gruppe.id)}
                                          checkHandler={this.artikelChecken}

                              />
                          ):
                          ''}
                  </dl>
              </div>
            </section>
            <hr/>
            <section>
              <div  id="list container">
                  <h2>Erledigt
                      <i onClick={() => this.erledigtAufZuKlappen()} className="material-icons">
                          {this.state.erledigtAufgeklappt ? 'expand_more' : 'expand_less'}
                      </i>
                  </h2>
                    {this.state.erledigtAufgeklappt
                        ? App.gruppenListe.map(gruppe =>
                            <GruppenTag key={gruppe.id} gruppe={gruppe} gekauft={true}
                                        aktiveGruppeHandler={() => this.setAktiveGruppe(gruppe.id)}
                                        checkHandler={this.artikelChecken}/>)
                        :
                        ''}
              </div>
            </section>
          </main>
          <hr/>
            <footer id="app-footer">
                 <button className="button3" placeholder={"Gruppen"}
                        onClick={() => this.setState({showGruppenDialog: true})}>
                        Gruppen
                </button>
            </footer>
            <GruppenDialog  visible = {this.state.showGruppenDialog} gruppenListe={App.gruppenListe}
                            onDialogClose = {() => this.setState({showGruppenDialog : false})}
            />

        </div>
    )
  }
}