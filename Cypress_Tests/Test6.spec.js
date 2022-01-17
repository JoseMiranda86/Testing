
import { navigateTo } from "../Page_Objects/navigationPage"
import { onFormLayoutsPage } from "..Page_Objects/formLayoutsPage"
import { onDatePickerPage } from "../Page_Objects/datepickerPage"
import { onSmartTablePage } from "../Page_Objects/smartTablePage"

describe('Test with Page Objects', () => {

    beforeEach('open application', () => {
        cy.openHomePage()
    })

    it('verify navigations across the pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datepickerPage()
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()
        navigateTo.toasterPage()
    })

    it.only('should sumbit Inline and Basic form and select tomorrow date in the calendar', () => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Name1', 'test@tests.com')
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@tests.com', 'password')
        navigateTo.datepickerPage()
        onDatePickerPage.selectCommonDatepickerDateFromToday(1)
        onDatePickerPage.selectDatepickerWithRangeFromToday(3, 8)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('Name1', 'LName1')
        onSmartTablePage.updateAgeByFirstName('Name1', '35')
        onSmartTablePage.deleteRowByIndex(1)
    })
})
