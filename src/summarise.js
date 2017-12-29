module.exports = (json) => {
    const gryffindor = [];
    const slytherin = [];
    const hufflepuff = [];
    const ravenclaw = [];
    const noHouse = [];
    const returned = {'gryffindor': gryffindor, 'slytherin': slytherin, 'hufflepuff': hufflepuff, 'ravenclaw': ravenclaw, 'noHouse': noHouse}

//UPDATE JSON MAP WITH THE STRINGS AROUND NAMES!!!!!

    json.map((wizard) => {
        switch (wizard.house) {
            case 'Gryffindor':
                gryffindor.push(wizard);
                break;
            case 'Slytherin':
                slytherin.push(wizard);
                break;
            case 'Hufflepuff':
                hufflepuff.push(wizard);
                break;
            case 'Ravenclaw':
                ravenclaw.push(wizard);
                break;
            default:
                noHouse.push(wizard);
                break;
        }
    })

    return [returned]
}