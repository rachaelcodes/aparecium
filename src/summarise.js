module.exports = (json) => {
    const returned = [{'gryffindor': [], 'slytherin': [], 'hufflepuff': [], 'ravenclaw': [], 'noHouse': []}]

//UPDATE JSON MAP WITH THE STRINGS AROUND NAMES!!!!!

    json.map((wizard) => {
        switch (wizard.house) {
            case gryffindor:
                returned[0].gryffindor.push(wizard);
                break;
            case slytherin:
                returned[0].slytherin.push(wizard);
                break;
            case hufflepuff:
                returned[0].hufflepuff.push(wizard);
                break;
            case ravenclaw:
                returned[0].ravenclaw.push(wizard);
                break;
            default:
                returned[0].noHouse.push
        }
    })

    return json
}