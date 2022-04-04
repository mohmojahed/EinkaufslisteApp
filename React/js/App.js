class App {
  static STORAGE_KEY = "einkaufslisteDaten"
  static gruppenListe = []
  static aktiveGruppe = null
  static meldungenAusgeben = true
  static einkaufenAufgeklappt = true
  static erledigtAufgeklappt = false


  static gruppeFinden(gruppenId) {
    const gefundeneGruppen = this.gruppenListe.filter((gruppe) => gruppe.id == gruppenId)
    if (gefundeneGruppen.length > 0) {
      return gefundeneGruppen[0]
    } else {
      App.informieren(`[App] Gruppe "${gruppenId}" nicht gefunden`, true)
      return null
    }
  }

  static gruppeHinzufuegen(name) {
    const gleicheGruppen = this.gruppenListe.filter(gruppe => gruppe.name == name)
    // keine Gruppe mit diesem Namen vorhanden
    if (gleicheGruppen.length == 0) {
      let neueGruppe = new Gruppe(name, this.gruppenListe.length)
      this.gruppenListe.push(neueGruppe)
      App.informieren(`[App] Gruppe "${neueGruppe.name}" hinzugefügt`)
      this.aktiveGruppe = neueGruppe.id
      return neueGruppe
    } else {
      App.informieren(`[App] Gruppe "${name}" existiert schon!`, true)
    }
  }

  static gruppeUmbenennen(gruppenId, neuerName) {
    let gruppe = this.gruppeFinden(gruppenId)
    if (gruppe) {
      App.informieren(`[App] Gruppe "${gruppe.name}" umbenannt in "${neuerName}"`)
      gruppe.name = neuerName

    }
  }

  static gruppeEntfernen(gruppenId) {
    let gruppe = this.gruppeFinden(gruppenId)
    if (gruppe) {
      let index = this.gruppenListe.indexOf(gruppe)
      // alle Artikel dieser Gruppe entfernen
      gruppe.artikelListe.map((artikel) => gruppe.artikelEntfernen(artikel))
      this.gruppenListe.splice(index, 1)
      App.informieren(`Gruppe "${gruppe.name}" entfernt`)
    } else {
      App.informieren(`Gruppe "${gruppenId}" konnte NICHT entfernt werden`, true)
    }
  }

  static allesAuflisten() {
    this.informieren("\nEinkaufsliste              ^")
    this.informieren("----------------------------")
    this.gruppenListe.map(gruppe => {
      console.debug(`[${gruppe.name}]`)
      gruppe.artikelAuflisten(false)
    })
    console.debug()
  }

  static async datenEinlesen(dateiname = "js/startzustand.json") {
    const response = await fetch(dateiname)
    const daten = await response.json()
    this.initialisieren(daten)
  }

  static initialisieren(jsonDaten) {
    this.gruppenListe = []
    jsonDaten.gruppenListe.map(gruppe => {
      let neueGruppe = this.gruppeHinzufuegen(gruppe.name)
      gruppe.artikelListe.map(artikel => {
        neueGruppe.artikelObjektHinzufuegen(artikel)
      })
    })
    this.aktiveGruppe = jsonDaten.aktiveGruppe
  }

  static stummschalten() {
    this.meldungenAusgeben = false
  }

  static lautschalten() {
    this.meldungenAusgeben = true
  }

  static speichern() {
    const json = {
      gruppenListe: this.gruppenListe,
      aktiveGruppe: this.aktiveGruppe,
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(json))
  }

  static laden() {
    let daten = JSON.parse(localStorage.getItem(this.STORAGE_KEY))
    this.initialisieren(daten)
  }

  static informieren(nachricht, istWarnung) {
    if (this.meldungenAusgeben) {
      if (istWarnung) {
        console.warn(nachricht)
      } else {
        console.debug(nachricht)
        this.speichern()
      }
    }
  }
}

