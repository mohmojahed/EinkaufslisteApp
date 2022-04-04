class GruppenTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aufgeklappt: true
        }
    }

    artikelEntfernen(artikel) {
        this.props.gruppe.artikelEntfernen(artikel)
        this.props.aktiveGruppeHandler(this.props.gruppe.id)
    }

    aufZuKlappen() {
        this.setState({aufgeklappt: !this.state.aufgeklappt})
    }

    render() {
        let gekauft = this.props.gekauft
        let itemsRelevant = []
        for (const artikel of this.props.gruppe.artikelListe) {
            if (artikel.gekauft == gekauft) {
                itemsRelevant.push(artikel)
            }
        }

        return (
            <div>
                <dt className={this.props.aktiv && !gekauft ? "aktiv" : "inaktiv"}
                    onClick={() => !gekauft ? this.props.aktiveGruppeHandler(this.props.gruppe.id) : ''}>
                    {this.props.gruppe.name}
                    <i onClick={() => this.aufZuKlappen()} className="material-icons">
                        {this.state.aufgeklappt ? 'expand_more' : 'expand_less'}
                    </i>
                </dt>
                {this.state.aufgeklappt
                    ? itemsRelevant.map(artikel =>
                        <ArtikelTag key={artikel.id} artikel={artikel}
                                    checkHandler={this.props.checkHandler}
                                    deleteHandler={() => this.artikelEntfernen(artikel.name)}/>)
                    : ''
                }
            </div>
        )
    }
}