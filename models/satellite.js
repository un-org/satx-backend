class Satellite {
    category;
    satname;
    satid;
    launchDate;
    source;
    launchSite;

    constructor({ category, satname, satid, launchDate, source, launchSite }) {
        this.category = category;
        this.satname = satname;
        this.satid = satid;
        this.launchDate = launchDate;
        this.source = source;
        this.launchSite = launchSite;
    }

    printSatInfo() {
        console.log(
            `Category ${this.category}`,
            `Name ${this.satname}`,
            `ID ${this.satid}`,
            `Launch Date ${this.launchDate}`,
            `Source ${this.source}`,
            `Launch Site ${this.launchSite}`
        );
    }
}

export default Satellite;
