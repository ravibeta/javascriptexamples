import { Selector } from 'testcafe'; 

fixture `New Fixture` 

    .page `http://localhost:8080/`; 

test('New Test', async t => { 

    await t 

        .switchToIframe('main [name="gsft_main"][title="Main Content"][data-original-title="Main Content"]') 

        .click('#user_name') 

        .typeText('#user_name', 'admin') 

        .pressKey('tab') 

        .typeText('#user_password', 'admin') 

        .click('#sysverb_login') 

        .switchToMainWindow() 

        .switchToIframe('main [name="gsft_main"][title="MyApp"][data-original-title="Main Content"]') 

        .click(Selector('span').withText('Welcome All')) 

        .click(Selector('#sysparm_button_result_page', { visibilityCheck: true })) 

        .click(Selector('#welcome_result\\.do div').withText('Welcome Links')) 

        .click(Selector('#sys_readonly\\.welcome_result\\.state').withText('Complete')); 

}); 
