function collectBirthday() {
    const MONTHS = [
        ContactsApp.Month.JANUARY,
        ContactsApp.Month.FEBRUARY,
        ContactsApp.Month.MARCH,
        ContactsApp.Month.APRIL,
        ContactsApp.Month.MAY,
        ContactsApp.Month.JUNE,
        ContactsApp.Month.JULY,
        ContactsApp.Month.AUGUST,
        ContactsApp.Month.SEPTEMBER,
        ContactsApp.Month.OCTOBER,
        ContactsApp.Month.NOVEMBER,
        ContactsApp.Month.DECEMBER
    ];

    // 現在日時の翌日を取得
    const date = new Date();
    date.setDate(date.getDate() + 1);

    // Google Contactsから誕生日が指定日の情報を取得
    const month = MONTHS[date.getMonth()];
    const day = date.getDate();
    const contacts = ContactsApp.getContactsByDate(month, day, ContactsApp.Field.BIRTHDAY);

    // 連絡先を取得できた場合はLINE Notifyにより通知する
    if (contacts.length > 0) {
        const message = createMessage(date, contacts);
        notifyByLine(message);
    }
}

function createMessage(date : Date, contacts : GoogleAppsScript.Contacts.Contact[]) : string {
    let message = '';
    for (const contact of contacts) {
        const dateField = contact.getDates(ContactsApp.Field.BIRTHDAY)[0];
        const birthday = new Date(dateField.getYear(), dateField.getMonth().ordinal(), dateField.getDay());
        message += `\n${contact.getFullName()} : ${Utilities.formatDate(birthday, 'JST', 'yyyy/MM/dd')}`;
    }
    return message;
}

function reserveNotify() {
}

function notifyByLine(message : string) {
    const token : string = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN');
    const options : GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
            method : 'post',
            headers : {'Authorization' : `Bearer ${token}`},
            payload : `message=${message}`
    };
    UrlFetchApp.fetch('https://notify-api.line.me/api/notify', options);
}

function registerTrigger() {
}
