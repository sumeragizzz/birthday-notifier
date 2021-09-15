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

    // TODO 動作確認コード → いずれ削除
    console.log(`month: ${month}, day: ${day}`);
    for (const contact of contacts) {
        console.log(`full name: ${contact.getFullName()}`);
    }
}

function reserveNotify() {
}

function notifyByLine() {
}

function registerTrigger() {
}
