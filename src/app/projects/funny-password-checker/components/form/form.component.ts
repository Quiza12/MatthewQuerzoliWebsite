import { Component } from '@angular/core';
import { StrengthsService } from '../../services/strengths/strengths.service';
import { PasswordService } from '../../services/password/password.service';
import { ClipboardService } from 'ngx-clipboard'

@Component({
  selector: 'fpc-form',
  standalone: true,
  imports: [],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  password:any;
  formType:any;
  hideOrShowButtonTag:any;
  emojiRegexLogic:any;
  emojiRegex:any;
  copyButtonDisabled:any;
  copiedStatus:any;

  constructor(
    private strengthsService:StrengthsService,
    private passwordService:PasswordService,
    private clipboardService: ClipboardService
  ) { }

  ngOnInit() {
    this.password = '';
    this.formType = 'password';
    this.hideOrShowButtonTag = 'Show';
    this.copyButtonDisabled = true;
    this.copiedStatus = 'Copy Password';
    this.emojiRegexLogic = "\u{00A9}|\u{00AE}|\u{203C}|\u{2049}|\u{2122}|\u{2139}|\u{2194}|\u{2195}|\u{2196}|\u{2197}|\u{2198}|\u{2199}|\u{21A9}|\u{21AA}|\u{231A}|\u{231B}|\u{2328}|\u{23CF}|\u{2E10}|\u{23EA}|\u{23EB}|\u{23EC}|\u{23ED}|\u{23EE}|\u{23EF}|\u{23F0}|\u{23F1}|\u{23F2}|\u{23F3}|\u{23F8}|\u{23F9}|\u{23FA}|\u{24C2}|\u{25AA}|\u{25AB}|\u{25B6}|\u{25C0}|\u{25FB}|\u{25FC}|\u{25FD}|\u{25FE}|\u{2600}|\u{2601}|\u{2602}|\u{2603}|\u{2604}|\u{260E}|\u{2611}|\u{2614}|\u{2615}|\u{2618}|\u{261D}|\u{2620}|\u{2622}|\u{2623}|\u{2626}|\u{262A}|\u{262E}|\u{262F}|\u{2638}|\u{2639}|\u{263A}|\u{2648}|\u{2649}|\u{264A}|\u{264B}|\u{264C}|\u{264D}|\u{264E}|\u{264F}|\u{2650}|\u{2651}|\u{2652}|\u{2653}|\u{2660}|\u{2663}|\u{2665}|\u{2666}|\u{2668}|\u{267B}|\u{267F}|\u{2692}|\u{2693}|\u{2694}|\u{2696}|\u{2697}|\u{2699}|\u{269B}|\u{269C}|\u{26A0}|\u{26A1}|\u{26AA}|\u{26AB}|\u{26B0}|\u{26B1}|\u{26BD}|\u{26BE}|\u{26C4}|\u{26C5}|\u{26C8}|\u{26CE}|\u{26CF}|\u{26D1}|\u{26D3}|\u{26D4}|\u{26E9}|\u{26EA}|\u{26F0}|\u{26F1}|\u{26F2}|\u{26F3}|\u{26F4}|\u{26F5}|\u{26F7}|\u{26F8}|\u{26F9}|\u{26FA}|\u{26FD}|\u{2702}|\u{2705}|\u{2708}|\u{2709}|\u{270A}|\u{270B}|\u{270C}|\u{270D}|\u{270F}|\u{2712}|\u{2714}|\u{2716}|\u{271D}|\u{2721}|\u{2728}|\u{2733}|\u{2734}|\u{2744}|\u{2747}|\u{274C}|\u{274E}|\u{2753}|\u{2754}|\u{2755}|\u{2757}|\u{2763}|\u{2764}|\u{2795}|\u{2796}|\u{2797}|\u{27A1}|\u{27B0}|\u{27BF}|\u{2934}|\u{2935}|\u{2B05}|\u{2B06}|\u{2B07}|\u{2B1B}|\u{2B1C}|\u{2B50}|\u{2B55}|\u{3030}|\u{303D}|\u{3297}|\u{3299}|\u{1F004}|\u{1F0CF}|\u{1F170}|\u{1F171}|\u{1F17E}|\u{1F17F}|\u{1F18E}|\u{1F191}|\u{1F192}|\u{1F193}|\u{1F194}|\u{1F195}|\u{1F196}|\u{1F197}|\u{1F198}|\u{1F199}|\u{1F19A}|\u{1F201}|\u{1F202}|\u{1F21A}|\u{1F22F}|\u{1F232}|\u{1F233}|\u{1F234}|\u{1F235}|\u{1F236}|\u{1F237}|\u{1F238}|\u{1F239}|\u{1F23A}|\u{1F250}|\u{1F251}|\u{1F300}|\u{1F301}|\u{1F302}|\u{1F303}|\u{1F304}|\u{1F305}|\u{1F306}|\u{1F307}|\u{1F308}|\u{1F309}|\u{1F30A}|\u{1F30B}|\u{1F30C}|\u{1F30D}|\u{1F30E}|\u{1F30F}|\u{1F310}|\u{1F311}|\u{1F312}|\u{1F313}|\u{1F314}|\u{1F315}|\u{1F316}|\u{1F317}|\u{1F318}|\u{1F319}|\u{1F31A}|\u{1F31B}|\u{1F31C}|\u{1F31D}|\u{1F31E}|\u{1F31F}|\u{1F320}|\u{1F321}|\u{1F324}|\u{1F325}|\u{1F326}|\u{1F327}|\u{1F328}|\u{1F329}|\u{1F32A}|\u{1F32B}|\u{1F32C}|\u{1F32D}|\u{1F32E}|\u{1F32F}|\u{1F330}|\u{1F331}|\u{1F332}|\u{1F333}|\u{1F334}|\u{1F335}|\u{1F336}|\u{1F337}|\u{1F338}|\u{1F339}|\u{1F33A}|\u{1F33B}|\u{1F33C}|\u{1F33D}|\u{1F33E}|\u{1F33F}|\u{1F340}|\u{1F341}|\u{1F342}|\u{1F343}|\u{1F344}|\u{1F345}|\u{1F346}|\u{1F347}|\u{1F348}|\u{1F349}|\u{1F34A}|\u{1F34B}|\u{1F34C}|\u{1F34D}|\u{1F34E}|\u{1F34F}|\u{1F350}|\u{1F351}|\u{1F352}|\u{1F353}|\u{1F354}|\u{1F355}|\u{1F356}|\u{1F357}|\u{1F358}|\u{1F359}|\u{1F35A}|\u{1F35B}|\u{1F35C}|\u{1F35D}|\u{1F35E}|\u{1F35F}|\u{1F360}|\u{1F361}|\u{1F362}|\u{1F363}|\u{1F364}|\u{1F365}|\u{1F366}|\u{1F367}|\u{1F368}|\u{1F369}|\u{1F36A}|\u{1F36B}|\u{1F36C}|\u{1F36D}|\u{1F36E}|\u{1F36F}|\u{1F370}|\u{1F371}|\u{1F372}|\u{1F373}|\u{1F374}|\u{1F375}|\u{1F376}|\u{1F377}|\u{1F378}|\u{1F379}|\u{1F37A}|\u{1F37B}|\u{1F37C}|\u{1F37D}|\u{1F37E}|\u{1F37F}|\u{1F380}|\u{1F381}|\u{1F382}|\u{1F383}|\u{1F384}|\u{1F385}|\u{1F386}|\u{1F387}|\u{1F388}|\u{1F389}|\u{1F38A}|\u{1F38B}|\u{1F38C}|\u{1F38D}|\u{1F38E}|\u{1F38F}|\u{1F390}|\u{1F391}|\u{1F392}|\u{1F393}|\u{1F396}|\u{1F397}|\u{1F399}|\u{1F39A}|\u{1F39B}|\u{1F39E}|\u{1F39F}|\u{1F3A0}|\u{1F3A1}|\u{1F3A2}|\u{1F3A3}|\u{1F3A4}|\u{1F3A5}|\u{1F3A6}|\u{1F3A7}|\u{1F3A8}|\u{1F3A9}|\u{1F3AA}|\u{1F3AB}|\u{1F3AC}|\u{1F3AD}|\u{1F3AE}|\u{1F3AF}|\u{1F3B0}|\u{1F3B1}|\u{1F3B2}|\u{1F3B3}|\u{1F3B4}|\u{1F3B5}|\u{1F3B6}|\u{1F3B7}|\u{1F3B8}|\u{1F3B9}|\u{1F3BA}|\u{1F3BB}|\u{1F3BC}|\u{1F3BD}|\u{1F3BE}|\u{1F3BF}|\u{1F3C0}|\u{1F3C1}|\u{1F3C2}|\u{1F3C3}|\u{1F3C4}|\u{1F3C5}|\u{1F3C6}|\u{1F3C7}|\u{1F3C8}|\u{1F3C9}|\u{1F3CA}|\u{1F3CB}|\u{1F3CC}|\u{1F3CD}|\u{1F3CE}|\u{1F3CF}|\u{1F3D0}|\u{1F3D1}|\u{1F3D2}|\u{1F3D3}|\u{1F3D4}|\u{1F3D5}|\u{1F3D6}|\u{1F3D7}|\u{1F3D8}|\u{1F3D9}|\u{1F3DA}|\u{1F3DB}|\u{1F3DC}|\u{1F3DD}|\u{1F3DE}|\u{1F3DF}|\u{1F3E0}|\u{1F3E1}|\u{1F3E2}|\u{1F3E3}|\u{1F3E4}|\u{1F3E5}|\u{1F3E6}|\u{1F3E7}|\u{1F3E8}|\u{1F3E9}|\u{1F3EA}|\u{1F3EB}|\u{1F3EC}|\u{1F3ED}|\u{1F3EE}|\u{1F3EF}|\u{1F3F0}|\u{1F3F3}|\u{1F3F4}|\u{1F3F5}|\u{1F3F7}|\u{1F3F8}|\u{1F3F9}|\u{1F3FA}|\u{1F3FB}|\u{1F3FC}|\u{1F3FD}|\u{1F3FE}|\u{1F3FF}|\u{1F400}|\u{1F401}|\u{1F402}|\u{1F403}|\u{1F404}|\u{1F405}|\u{1F406}|\u{1F407}|\u{1F408}|\u{1F409}|\u{1F40A}|\u{1F40B}|\u{1F40C}|\u{1F40D}|\u{1F40E}|\u{1F40F}|\u{1F410}|\u{1F411}|\u{1F412}|\u{1F413}|\u{1F414}|\u{1F415}|\u{1F416}|\u{1F417}|\u{1F418}|\u{1F419}|\u{1F41A}|\u{1F41B}|\u{1F41C}|\u{1F41D}|\u{1F41E}|\u{1F41F}|\u{1F420}|\u{1F421}|\u{1F422}|\u{1F423}|\u{1F424}|\u{1F425}|\u{1F426}|\u{1F427}|\u{1F428}|\u{1F429}|\u{1F42A}|\u{1F42B}|\u{1F42C}|\u{1F42D}|\u{1F42E}|\u{1F42F}|\u{1F430}|\u{1F431}|\u{1F432}|\u{1F433}|\u{1F434}|\u{1F435}|\u{1F436}|\u{1F437}|\u{1F438}|\u{1F439}|\u{1F43A}|\u{1F43B}|\u{1F43C}|\u{1F43D}|\u{1F43E}|\u{1F43F}|\u{1F440}|\u{1F441}|\u{1F442}|\u{1F443}|\u{1F444}|\u{1F445}|\u{1F446}|\u{1F447}|\u{1F448}|\u{1F449}|\u{1F44A}|\u{1F44B}|\u{1F44C}|\u{1F44D}|\u{1F44E}|\u{1F44F}|\u{1F450}|\u{1F451}|\u{1F452}|\u{1F453}|\u{1F454}|\u{1F455}|\u{1F456}|\u{1F457}|\u{1F458}|\u{1F459}|\u{1F45A}|\u{1F45B}|\u{1F45C}|\u{1F45D}|\u{1F45E}|\u{1F45F}|\u{1F460}|\u{1F461}|\u{1F462}|\u{1F463}|\u{1F464}|\u{1F465}|\u{1F466}|\u{1F467}|\u{1F468}|\u{1F469}|\u{1F46A}|\u{1F46B}|\u{1F46C}|\u{1F46D}|\u{1F46E}|\u{1F46F}|\u{1F470}|\u{1F471}|\u{1F472}|\u{1F473}|\u{1F474}|\u{1F475}|\u{1F476}|\u{1F477}|\u{1F478}|\u{1F479}|\u{1F47A}|\u{1F47B}|\u{1F47C}|\u{1F47D}|\u{1F47E}|\u{1F47F}|\u{1F480}|\u{1F481}|\u{1F482}|\u{1F483}|\u{1F484}|\u{1F485}|\u{1F486}|\u{1F487}|\u{1F488}|\u{1F489}|\u{1F48A}|\u{1F48B}|\u{1F48C}|\u{1F48D}|\u{1F48E}|\u{1F48F}|\u{1F490}|\u{1F491}|\u{1F492}|\u{1F493}|\u{1F494}|\u{1F495}|\u{1F496}|\u{1F497}|\u{1F498}|\u{1F499}|\u{1F49A}|\u{1F49B}|\u{1F49C}|\u{1F49D}|\u{1F49E}|\u{1F49F}|\u{1F4A0}|\u{1F4A1}|\u{1F4A2}|\u{1F4A3}|\u{1F4A4}|\u{1F4A5}|\u{1F4A6}|\u{1F4A7}|\u{1F4A8}|\u{1F4A9}|\u{1F4AA}|\u{1F4AB}|\u{1F4AC}|\u{1F4AD}|\u{1F4AE}|\u{1F4AF}|\u{1F4B0}|\u{1F4B1}|\u{1F4B2}|\u{1F4B3}|\u{1F4B4}|\u{1F4B5}|\u{1F4B6}|\u{1F4B7}|\u{1F4B8}|\u{1F4B9}|\u{1F4BA}|\u{1F4BB}|\u{1F4BC}|\u{1F4BD}|\u{1F4BE}|\u{1F4BF}|\u{1F4C0}|\u{1F4C1}|\u{1F4C2}|\u{1F4C3}|\u{1F4C4}|\u{1F4C5}|\u{1F4C6}|\u{1F4C7}|\u{1F4C8}|\u{1F4C9}|\u{1F4CA}|\u{1F4CB}|\u{1F4CC}|\u{1F4CD}|\u{1F4CE}|\u{1F4CF}|\u{1F4D0}|\u{1F4D1}|\u{1F4D2}|\u{1F4D3}|\u{1F4D4}|\u{1F4D5}|\u{1F4D6}|\u{1F4D7}|\u{1F4D8}|\u{1F4D9}|\u{1F4DA}|\u{1F4DB}|\u{1F4DC}|\u{1F4DD}|\u{1F4DE}|\u{1F4DF}|\u{1F4E0}|\u{1F4E1}|\u{1F4E2}|\u{1F4E3}|\u{1F4E4}|\u{1F4E5}|\u{1F4E6}|\u{1F4E7}|\u{1F4E8}|\u{1F4E9}|\u{1F4EA}|\u{1F4EB}|\u{1F4EC}|\u{1F4ED}|\u{1F4EE}|\u{1F4EF}|\u{1F4F0}|\u{1F4F1}|\u{1F4F2}|\u{1F4F3}|\u{1F4F4}|\u{1F4F5}|\u{1F4F6}|\u{1F4F7}|\u{1F4F8}|\u{1F4F9}|\u{1F4FA}|\u{1F4FB}|\u{1F4FC}|\u{1F4FD}|\u{1F4FF}|\u{1F500}|\u{1F501}|\u{1F502}|\u{1F503}|\u{1F504}|\u{1F505}|\u{1F506}|\u{1F507}|\u{1F508}|\u{1F509}|\u{1F50A}|\u{1F50B}|\u{1F50C}|\u{1F50D}|\u{1F50E}|\u{1F50F}|\u{1F510}|\u{1F511}|\u{1F512}|\u{1F513}|\u{1F514}|\u{1F515}|\u{1F516}|\u{1F517}|\u{1F518}|\u{1F519}|\u{1F51A}|\u{1F51B}|\u{1F51C}|\u{1F51D}|\u{1F51E}|\u{1F51F}|\u{1F520}|\u{1F521}|\u{1F522}|\u{1F523}|\u{1F524}|\u{1F525}|\u{1F526}|\u{1F527}|\u{1F528}|\u{1F529}|\u{1F52A}|\u{1F52B}|\u{1F52C}|\u{1F52D}|\u{1F52E}|\u{1F52F}|\u{1F530}|\u{1F531}|\u{1F532}|\u{1F533}|\u{1F534}|\u{1F535}|\u{1F536}|\u{1F537}|\u{1F538}|\u{1F539}|\u{1F53A}|\u{1F53B}|\u{1F53C}|\u{1F53D}|\u{1F549}|\u{1F54A}|\u{1F54B}|\u{1F54C}|\u{1F54D}|\u{1F54E}|\u{1F550}|\u{1F551}|\u{1F552}|\u{1F553}|\u{1F554}|\u{1F555}|\u{1F556}|\u{1F557}|\u{1F558}|\u{1F559}|\u{1F55A}|\u{1F55B}|\u{1F55C}|\u{1F55D}|\u{1F55E}|\u{1F55F}|\u{1F560}|\u{1F561}|\u{1F562}|\u{1F563}|\u{1F564}|\u{1F565}|\u{1F566}|\u{1F567}|\u{1F56F}|\u{1F570}|\u{1F573}|\u{1F574}|\u{1F575}|\u{1F576}|\u{1F577}|\u{1F578}|\u{1F579}|\u{1F587}|\u{1F58A}|\u{1F58B}|\u{1F58C}|\u{1F58D}|\u{1F590}|\u{1F595}|\u{1F596}|\u{1F5A5}|\u{1F5A8}|\u{1F5B1}|\u{1F5B2}|\u{1F5BC}|\u{1F5C2}|\u{1F5C3}|\u{1F5C4}|\u{1F5D1}|\u{1F5D2}|\u{1F5D3}|\u{1F5DC}|\u{1F5DD}|\u{1F5DE}|\u{1F5E1}|\u{1F5E3}|\u{1F5EF}|\u{1F5F3}|\u{1F5FA}|\u{1F5FB}|\u{1F5FC}|\u{1F5FD}|\u{1F5FE}|\u{1F5FF}|\u{1F600}|\u{1F601}|\u{1F602}|\u{1F603}|\u{1F604}|\u{1F605}|\u{1F606}|\u{1F607}|\u{1F608}|\u{1F609}|\u{1F60A}|\u{1F60B}|\u{1F60C}|\u{1F60D}|\u{1F60E}|\u{1F60F}|\u{1F610}|\u{1F611}|\u{1F612}|\u{1F613}|\u{1F614}|\u{1F615}|\u{1F616}|\u{1F617}|\u{1F618}|\u{1F619}|\u{1F61A}|\u{1F61B}|\u{1F61C}|\u{1F61D}|\u{1F61E}|\u{1F61F}|\u{1F620}|\u{1F621}|\u{1F622}|\u{1F623}|\u{1F624}|\u{1F625}|\u{1F626}|\u{1F627}|\u{1F628}|\u{1F629}|\u{1F62A}|\u{1F62B}|\u{1F62C}|\u{1F62D}|\u{1F62E}|\u{1F62F}|\u{1F630}|\u{1F631}|\u{1F632}|\u{1F633}|\u{1F634}|\u{1F635}|\u{1F636}|\u{1F637}|\u{1F638}|\u{1F639}|\u{1F63A}|\u{1F63B}|\u{1F63C}|\u{1F63D}|\u{1F63E}|\u{1F63F}|\u{1F640}|\u{1F641}|\u{1F642}|\u{1F643}|\u{1F644}|\u{1F645}|\u{1F646}|\u{1F647}|\u{1F648}|\u{1F649}|\u{1F64A}|\u{1F64B}|\u{1F64C}|\u{1F64D}|\u{1F64E}|\u{1F64F}|\u{1F680}|\u{1F681}|\u{1F682}|\u{1F683}|\u{1F684}|\u{1F685}|\u{1F686}|\u{1F687}|\u{1F688}|\u{1F689}|\u{1F68A}|\u{1F68B}|\u{1F68C}|\u{1F68D}|\u{1F68E}|\u{1F68F}|\u{1F690}|\u{1F691}|\u{1F692}|\u{1F693}|\u{1F694}|\u{1F695}|\u{1F696}|\u{1F697}|\u{1F698}|\u{1F699}|\u{1F69A}|\u{1F69B}|\u{1F69C}|\u{1F69D}|\u{1F69E}|\u{1F69F}|\u{1F6A0}|\u{1F6A1}|\u{1F6A2}|\u{1F6A3}|\u{1F6A4}|\u{1F6A5}|\u{1F6A6}|\u{1F6A7}|\u{1F6A8}|\u{1F6A9}|\u{1F6AA}|\u{1F6AB}|\u{1F6AC}|\u{1F6AD}|\u{1F6AE}|\u{1F6AF}|\u{1F6B0}|\u{1F6B1}|\u{1F6B2}|\u{1F6B3}|\u{1F6B4}|\u{1F6B5}|\u{1F6B6}|\u{1F6B7}|\u{1F6B8}|\u{1F6B9}|\u{1F6BA}|\u{1F6BB}|\u{1F6BC}|\u{1F6BD}|\u{1F6BE}|\u{1F6BF}|\u{1F6C0}|\u{1F6C1}|\u{1F6C2}|\u{1F6C3}|\u{1F6C4}|\u{1F6C5}|\u{1F6CB}|\u{1F6CC}|\u{1F6CD}|\u{1F6CE}|\u{1F6CF}|\u{1F6D0}|\u{1F6E0}|\u{1F6E1}|\u{1F6E2}|\u{1F6E3}|\u{1F6E4}|\u{1F6E5}|\u{1F6E9}|\u{1F6EB}|\u{1F6EC}|\u{1F6F0}|\u{1F6F3}|\u{1F910}|\u{1F911}|\u{1F912}|\u{1F913}|\u{1F914}|\u{1F915}|\u{1F916}|\u{1F917}|\u{1F918}|\u{1F980}|\u{1F981}|\u{1F982}|\u{1F983}|\u{1F984}|\u{1F9C0}";
    this.emojiRegex = new RegExp("/" + this.emojiRegexLogic + "/gu");
  }

  copyText(text: string){
    this.clipboardService.copy(text)
  }

  showOrHidePassword() {
    if (this.formType === 'text') {
      this.formType = 'password';
      this.hideOrShowButtonTag = 'Show';
      this.copyButtonDisabled = true;
    } else {
      this.formType = 'text';
      this.hideOrShowButtonTag = 'Hide';
      this.copyButtonDisabled = false;
    }
  }

  copySuccess() {
    this.copiedStatus = 'Password Copied!';
  }

  onKey(event: any) { // without type info
    this.password = event.target.value;
    this.passwordService.setData(this.password);
    this.strengthsService.clearTempArray();
    this.passwordService.passwordStrength = 0;
    this.getReasonsForPassword();
    this.copiedStatus = 'Copy Password';
  }

  getReasonsForPassword() {
    for (var i = 0; i < this.strengthsService.strengthReasons.length; i++) {

      switch (this.strengthsService.strengthReasons[i].tag) {
        case 'length' : this.determineLengthTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'numerics' : this.determineNumericsTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'specialChars' : this.determineSpecialCharsTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'uppercase' : this.determineUppercaseTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'lowercase' : this.determineLowercaseTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'password' : this.determinePasswordTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'nsync' : this.determineNsyncTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'swearWords' : this.determineSwearWordsTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'sequentialNumbers' : this.determinePasswordTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'grandFinal' : this.determineGrandFinalTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'jesus' : this.determineJesusTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'racist' : this.determineRacistTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'penis' : this.determinePenisTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'vagina' : this.determineVaginaTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'seven' : this.determineSevenTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'avengers' : this.determineAvengersTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'avengersDead' : this.determineAvengersDeadTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'gel' : this.determineGelTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'genghis' : this.determineGenghisTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'wilson' : this.determineWilsonTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'love' : this.determineLoveTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'viagra' : this.determineViagraTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'prada' : this.determinePradaTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'lift' : this.determineLiftTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'copyright' : this.determineCopyrightTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'emoji' : this.determineEmojiTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'garlic' : this.determineGarlicTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'kanye' : this.determineKanyeTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'oils' : this.determineOilsTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'eggs' : this.determineEggsTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'synonym' : this.determineSynonymTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'wrench' : this.determineWrenchTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'nuts' : this.determineNutsTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'sherpa' : this.determineSherpaTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'pm' : this.determinePmTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'depression' : this.determineDepressionTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'whitlams' : this.determineWhitlamsTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'bone' : this.determineBoneTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'acid' : this.determineAcidBaseTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
        case 'corona' : this.determineCoronaTag(this.password, this.strengthsService.strengthReasons[i].reason); break;
      }
    }
  }

  determineLengthTag(password:string, reason:string) {
    if (password.length >= 0 && password.length <= 8) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineNumericsTag(password:string, reason:string) {
    if (!password.match(/[\d]/)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineSpecialCharsTag(password:string, reason:string) {
    if (!password.match(/[.!@#$%^&*()_+=-]/)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineUppercaseTag(password:string, reason:string) {
    if (!password.match(/[A-Z]/)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineLowercaseTag(password:string, reason:string) {
    if (!password.match(/[a-z]/)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determinePasswordTag(password:string, reason:string) {
    if (password.match(/password/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineNsyncTag(password:string, reason:string) {
    if (!password.match(/lance|bass|jc|chasez|joey|fatone|chris|kirkpatrick|justin|timberlake/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineSwearWordsTag(password:string, reason:string) {
    if (!password.match(/fuck|shit|cunt|twat|bitch|bastard|motherfucker/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineSequentialNumbersTag(password:any, reason:string) {
    for (var i in password) {
      if (+password[+i+1] == +password[i]+1 && +password[+i+2] == +password[i]+2) {
        this.strengthsService.addToTempArray(reason);
        this.passwordService.passwordStrength++;
      }
    }
  }

  determineGrandFinalTag(password:string, reason:string) {
    if (!password.match(/4/)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineJesusTag(password:string, reason:string) {
    if (!password.match(/jesus|christ|lord|god|saviour|son|amen/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineRacistTag(password:string, reason:string) {
    if (password.match(/abo|aboriginal|dink|cracker|coon|nigger|chink|eyetie|wog|gyppo|injun|raghead|terrorist|tacohead|towelhead|wetback/i)) {
      this.strengthsService.addToTempArray(reason);
      this.passwordService.passwordStrength++;
    }
  }

  determinePenisTag(password:string, reason:string) {
    if (password.match(/penis|dick|cock|willy|prick|knob|rod|phallus|shaft|member/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineVaginaTag(password:string, reason:string) {
    if (!password.match(/vagina|coochie|vag|cunt|pussy|snatch|beaver|flower|peach|twinkie/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineSevenTag(password:string, reason:string) {
    if (password.match(/7/)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineAvengersTag(password:string, reason:string) {
    if (!password.match(/Black\sPanther|BlackPanther|Black\sWidow|BlackWidow|Captain\sAmerica|CaptainAmerica|Captain\sMarvel|CaptainMarvel|Ant-Man|AntMan|AntMan|Hawkeye|Hulk|Iron\sMan|IronMan|Quicksilver|Scarlett\sWitch|ScarlettWitch|Thor|Spider-man|Spiderman|Spider\sman|Vision|War\sMachine|WarMachine|Doctor\sStrange|DoctorStrange|Falcon/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineAvengersDeadTag(password:string, reason:string) {
    if (password.match(/Vision|Black\sPanther|BlackPanther|T’Challa|Spider-man|Spiderman|Spider\sman|Doctor\sStrange|DoctorStrange|Scarlett\sWitch|ScarlettWitch/)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineGelTag(password:string, reason:string) {
    if (!password.match(/Spiker\sGel|Spiker-Gel|spiker/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineGenghisTag(password:string, reason:string) {
    if (!password.match(/Genghis\sKhan|Genghis|Khan/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineWilsonTag(password:string, reason:string) {
    if (!password.match(/wilson/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  //TO DO MORE ON
  determineLoveTag(password:string, reason:string) {
    if (!password.match(/love/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineViagraTag(password:string, reason:string) {
    if (!password.match(/viagra/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determinePradaTag(password:string, reason:string) {
    if (!password.match(/prada/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineLiftTag(password:string, reason:string) {
    if (!password.match(/\d+kg/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineCopyrightTag(password:string, reason:string) {
    if (!password.match(/\u00A9/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineGarlicTag(password:string, reason:string) {
    if (!password.match(/garlic|vampire|vampires|dracula/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineEmojiTag(password:string, reason:string) {
    if (!password.match(this.emojiRegex)) { this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineKanyeTag(password:string, reason:string) {
    if (!password.match(/canonlymakemestronger|can only make me stronger/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineOilsTag(password:string, reason:string) {
    if (!password.match(/onlythestrong/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineEggsTag(password:string, reason:string) {
    if (!password.match(/eggs/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineSynonymTag(password:string, reason:string) {
    if (password.match(/watery|washy|unaccented|light|fallible|frail|imperfect|decrepit|debile|feeble|infirm|rickety|sapless|weakly|faint|weak/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineWrenchTag(password:string, reason:string) {
    if (!password.match(/ball/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineNutsTag(password:string, reason:string) {
    if (!password.match(/almond|beech|walnut|brazil|butternut|candlenut|cashew|chestnuts|chestnut|chinkapin|cobnut|colocynth|filbert|gingko|hazelnut|heartnut|hickory|kluwak|macadamia|mamoncillo|maya|mongongo|pecan|pili|pine|pinyon|pistachio|pistacia|sapucaya|sapucia|shagbark hickory|tiger/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineSherpaTag(password:string, reason:string) {
    if (!password.match(/sherpa|sherpas/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determinePmTag(password:string, reason:string) {
    if (!password.match(/hard|frigging|impossible|frigging impossible|friggingimpossible/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineDepressionTag(password:string, reason:string) {
    if (!password.match(/depression|anxiety/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineWhitlamsTag(password:string, reason:string) {
    if (!password.match(/loneliness/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineBoneTag(password:string, reason:string) {
    if (!password.match(/thigh|femur/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineAcidBaseTag(password:string, reason:string) {
    if (password.match(/formic|acetic|trichloroacetic|hydrofluoric|hydrocyanic|water|ammonia|trimethyl|ammonia|pyridine|ammonium|hyroxide/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

  determineCoronaTag(password:string, reason:string) {
    if (password.match(/corona/i)) {
      this.strengthsService.addToTempArray(reason);
    } else {
      this.passwordService.passwordStrength++;
    }
  }

}
