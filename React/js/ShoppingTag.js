
class ShoppingTag extends React.Component {


    constructor(props) {

        let gruppe1 = App.gruppeHinzufuegen("Obst & Gemüse");
        gruppe1.artikelHinzufuegen("Brokkoli");
        let gruppe2 = App.gruppeHinzufuegen("Getreideprodukte");
        gruppe2.artikelHinzufuegen("Reis");
        gruppe2.artikelHinzufuegen("Brot");
        gruppe2.artikelHinzufuegen("Nudeln");
        let gruppe3 = App.gruppeHinzufuegen("Milchprodukte");
        gruppe3.artikelHinzufuegen("Streukäse")
        let gekaufterArtikel = gruppe3.artikelHinzufuegen("Milch")
        gekaufterArtikel.gekauft = true
        super(props);
        this.state = {
            aktiveGruppe : null,
            showGruppenDialog : false,
        }
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

    setAktiveGruppe(gruppenId) {
        App.aktiveGruppe = gruppenId
        const gruppe = App.gruppeFinden(gruppenId)
        App.informieren(`[App] Gruppe "${gruppe.name}" ist nun aktiv`)
        this.setState({aktiveGruppe: App.aktiveGruppe})
    }

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

    setActiveGruppe = (gruppenID) =>
    {
        App.aktiveGruppe = gruppenID
        this.setState({aktiveGruppe: App.aktiveGruppe})
        console.debug(this.state.aktiveGruppe)
    }

    artikelChecken = (artikel) =>
    {
        artikel.gekauft = !artikel.gekauft
        this.setState(this.state)
    }
    einkaufenAufZuKlappen() {
        this.setState({einkaufenAufgeklappt: !this.state.einkaufenAufgeklappt})
    }

    erledigtAufZuKlappen() {
        this.setState({erledigtAufgeklappt: !this.state.erledigtAufgeklappt})
    }

    render = () => {
    return (
        <div>
          <header>
            <h1>Einkaufsliste</h1>
                <div id= {"hinzufeugen"}>
                  <nav>
                      <input id={"artikelEingabe"} type="text" placeholder="Artikel hinzufügen"
                      onKeyPress={e => (e.key == 'Enter') ? this.artikelHinzufuegen() : ''}/>
                      <button className="material-icons" onClick={() => this.artikelHinzufuegen()}>add_circle</button>
                  </nav>
                </div>
          </header>
          <hr/>

          <main>
            <section>
              <h2>Einkaufen
                  <i onClick={() => this.einkaufenAufZuKlappen()} className="material-icons">
                      {this.state.einkaufenAufgeklappt ? 'expand_more' : 'expand_less'}
                  </i>
              </h2>
              <dl>
                  {this.state.einkaufenAufgeklappt
                      ? App.gruppenListe.map(gruppe =>
                          <GruppenTag key={gruppe.id} gruppe={gruppe} gekauft={false}
                                      aktiv={gruppe.id == App.aktiveGruppe}
                                      aktiveGruppeHandler={() => this.setAktiveGruppe(gruppe.id)}
                                      checkHandler={this.artikelChecken}/>
                      ): ''}
              </dl>
            </section>
            <hr/>
            <section>
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
                    : ''}
            </section>
          </main>
          <hr/>

          <footer>
              <nav>
                  <GruppenDialog visible = {this.showGruppenDialog} onDialogClose = {() => this.setState({showGruppenDialog : false})}
                  />
                  <button>
                  <span className="material-icons"  onClick={() => this.setState({showGruppenDialog : true})}>bookmark_add</span>
                  </button>
              </nav>
          </footer>

        </div>
    )
  }
}