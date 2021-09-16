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

    // LINEによる通知
    let message : string = date.toString();
    message += "\n";
    for (const contact of contacts) {
        message += contact.getFullName
        message += "\n";
    }
    notifyByLine(message);
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
