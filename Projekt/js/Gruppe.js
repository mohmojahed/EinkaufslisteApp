
class Gruppe {
    static gruppenCounter = 1

    constructor(name, index) {
        this.id = Gruppe.gruppenCounter++
        this.index = index
        this.name = name
        this.artikelListe = []
    }

    artikelFinden(suchName, meldungAusgeben) {
        let gefundeneArtikel = this.artikelListe.filter(artikel => artikel.name == suchName)
        if (gefundeneArtikel.length > 0) {
            return gefundeneArtikel[0]
        }
        if (meldungAusgeben) {
            App.informieren(`[${this.name}] Artikel "${suchName}" nicht gefunden`, true)
        }
        return null
    }

    artikelAuflisten(gekauft) {
        this.artikelListe.map(artikel => {
            if (artikel.gekauft == gekauft) {
                console.debug(`  ${artikel.name}`)
            }
        })
    }

     artikelHinzufuegen(name) {
        let vorhandenerArtikel = this.artikelFinden(name, false)
        if (!vorhandenerArtikel) {
            let neuerArtikel = new Artikel(name, this.artikelListe.length)
            this.artikelListe.push(neuerArtikel)
            App.informieren(`[${this.name}] Artikel "${name}" hinzugefügt`)
            return neuerArtikel
        } else {
            App.informieren(`[${this.name}] Artikel "${name}" existiert schon!`, true)
        }
    }

    artikelObjektHinzufuegen(artikel) {
        let neuerArtikel = this.artikelHinzufuegen(artikel.name)
        // kopiert alle Properties aus "artikel" nach "neuerArtikel"
        Object.assign(neuerArtikel, artikel)
    }

    artikelUmbenennen(alterName, neuerName) {
        let artikel = this.artikelFinden(alterName, true)
        if (artikel) {
            artikel.name = neuerName
            App.informieren(`[${this.name}] Artikel "${alterName}" umbenannt in "${neuerName}"`)
        }
    }

    artikelEntfernen(name) {
        let artikel = this.artikelFinden(name, true)
        if (artikel) {
            let index = this.artikelListe.indexOf(name)
            this.artikelListe.splice(index, 1)
            App.informieren(`[${this.name}] Artikel "${name}" entfernt`)
        }
    }
}
