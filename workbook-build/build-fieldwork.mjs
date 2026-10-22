import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const require=createRequire(process.env.ARTIFACT_TOOL_PACKAGE_JSON || import.meta.url);
const {Workbook,SpreadsheetFile}=require('@oai/artifact-tool');

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'outputs/fieldwork-20261022');
const assets=path.join(root,'site/dist/assets/fieldwork');
await fs.mkdir(out,{recursive:true});await fs.mkdir(assets,{recursive:true});
const wb=Workbook.create();
const plan=wb.worksheets.add('调研准备');
const notes=wb.worksheets.add('现场记录');
const follow=wb.worksheets.add('复盘跟进');
const C={ink:'#193B32',green:'#27644E',muted:'#65756B',line:'#DAE2D4',paper:'#F6F7F1',input:'#FFF7E3',pale:'#E7EFDE',white:'#FFFFFF'};
function cell(sh,a,v){sh.getRange(a).values=[[v]]}
function base(sh,end,columns,title){
 sh.showGridLines=false;
 sh.getRange(`A1:${end}`).format={font:{name:'Microsoft YaHei',size:11,color:C.ink},fill:C.white,verticalAlignment:'center',rowHeight:25};
 sh.getRange('A:A').format.columnWidth=3;
 for(const [col,width]of Object.entries(columns))sh.getRange(`${col}:${col}`).format.columnWidth=width;
 cell(sh,'B2',title);sh.getRange('B2').format.font={name:'Microsoft YaHei',size:17,bold:true,color:C.ink};sh.getRange('B2').format.rowHeight=35;
 const last=Object.keys(columns).at(-1);sh.getRange(`B3:${last}3`).format.borders={bottom:{style:'medium',color:C.green}};
 sh.tabColor=C.green;
}
function header(sh,address,values){const r=sh.getRange(address);r.values=[values];r.format={fill:C.green,font:{name:'Microsoft YaHei',size:11,bold:true,color:C.white},wrapText:true,horizontalAlignment:'center',verticalAlignment:'center',rowHeight:35,borders:{insideVertical:{style:'thin',color:C.white}}}}
function band(sh,address,title){const r=sh.getRange(address);r.format={fill:C.pale,font:{name:'Microsoft YaHei',size:11,bold:true,color:C.green},rowHeight:30};cell(sh,address.split(':')[0],title)}
function input(sh,address){sh.getRange(address).format={fill:C.input,font:{name:'Microsoft YaHei',size:11,color:C.ink},wrapText:true,verticalAlignment:'top',borders:{bottom:{style:'thin',color:'#D9CFAD'}}}}
function tableBody(sh,address,first,last){sh.getRange(address).format={wrapText:true,verticalAlignment:'top',rowHeight:57,borders:{insideHorizontal:{style:'thin',color:C.line}}};for(let i=first;i<=last;i++)sh.getRange(`${address.split(':')[0].replace(/\d/g,'')}${i}:${address.split(':')[1].replace(/\d/g,'')}${i}`).format.fill=i%2?C.paper:C.white}
function list(sh,address,values){sh.getRange(address).dataValidation={rule:{type:'list',values}}}

base(plan,'F29',{B:25,C:49,D:25,E:49,F:3},'企业与实地调研工作簿');
cell(plan,'B4','创想');cell(plan,'C4','调研准备 → 现场记录 → 复盘跟进');
plan.getRange('B4:E4').format.font={name:'Microsoft YaHei',size:10,color:C.muted};
band(plan,'B6:C6','行前安排');band(plan,'D6:E6','现场约定');
const pairs=[['项目 / 团队','调研日期'],['这次想弄清什么','接收单位 / 地点'],['计划接触的岗位','对接方式'],['联系人（可用代号）','主访 / 记录人'],['想看的业务环节','资料使用范围'],['需提前发给对方的材料','录音 / 拍照安排']];
pairs.forEach((pair,i)=>{const r=7+i;cell(plan,`B${r}`,pair[0]);cell(plan,`D${r}`,pair[1]);input(plan,`C${r}`);input(plan,`E${r}`);plan.getRange(`B${r}:E${r}`).format.rowHeight=i===1?58:39});
plan.getRange('E7').setNumberFormat('yyyy-mm-dd');
list(plan,'E9',['学生自主联系','学校或老师牵线','校友或熟人引荐','其他']);
list(plan,'E11',['待确认','可公开','仅限团队内部','需逐项征求同意']);
list(plan,'E12',['待确认','获准录音','获准拍照','仅文字记录','其他约定']);
band(plan,'B14:E14','本次要问清的事');
header(plan,'B15:E15',['想弄清的问题','准备问谁 / 看什么','怎样核实','需要准备的资料']);
input(plan,'B16:E19');plan.getRange('B16:E19').format.rowHeight=49;
band(plan,'B21:E21','使用前看一眼');
const guide=[
 ['填写顺序','先填本页，再用“现场记录”逐条记事实，最后到“复盘跟进”列发现和下一步。'],
 ['颜色说明','浅黄色是填写区。深绿色是表头。示例单列在对应工作表下方，不算真实记录。'],
 ['记录方法','时间、岗位、材料编号写具体。受访者原话与我们的理解分栏，回头才能核对。'],
 ['文件与权限','一场走访另存一份。材料按编号归档，能否公开先确认，外发前检查个人与企业信息。']
 ];
guide.forEach((v,i)=>{const r=22+i;cell(plan,`B${r}`,v[0]);cell(plan,`C${r}`,v[1]);plan.getRange(`B${r}`).format.font.bold=true;plan.getRange(`C${r}:E${r}`).merge();plan.getRange(`B${r}:E${r}`).format={wrapText:true,rowHeight:42,verticalAlignment:'center'};});
cell(plan,'B27','模板由创想整理，按实际调研修改。');plan.getRange('B27').format.font={name:'Microsoft YaHei',size:10,color:C.muted};

base(notes,'J36',{B:12,C:15,D:24,E:50,F:38,G:17,H:21,I:34,J:3},'现场记录');
cell(notes,'B4','调研日期');input(notes,'C4');notes.getRange('C4').setNumberFormat('yyyy-mm-dd');cell(notes,'D4','单位 / 场景');input(notes,'E4');cell(notes,'F4','记录人（可用代号）');input(notes,'G4');cell(notes,'H4','走访编号');input(notes,'I4');
cell(notes,'B5','每行记一件事。原话加引号，并注明是谁说的；自己的推测放在“理解”栏。');notes.getRange('B5').format.font={name:'Microsoft YaHei',size:10,color:C.muted};
const headings=['记录编号','时间','对象 / 环节','现场事实或受访者原话','我们的理解（待核实）','材料编号','可用范围','还需要问清什么'];
header(notes,'B6:I6',headings);
const nt=notes.tables.add('B6:I26',true,'FieldworkRecords');nt.style='TableStyleMedium4';nt.showFilterButton=true;
tableBody(notes,'B7:I26',7,26);
notes.getRange('B7:I26').format.fill=C.input;
notes.getRange('E7:E26').format.fill='#F0F5EB';
notes.getRange('C7:C26').setNumberFormat('hh:mm');
list(notes,'H7:H26',['待确认','可公开','仅限团队内部','不可引用']);
notes.freezePanes.freezeRows(6);notes.freezePanes.freezeColumns(3);
band(notes,'B29:I29','填写示例（虚构，仅演示记录方式）');
header(notes,'B30:I30',headings);
notes.getRange('B31:I32').values=[
 ['示例01',10.5/24,'设备运维 / 抄表','P01：“目前按车间汇总用电，异常时再去现场找设备。”','是否需要按设备看趋势，还需和生产、能源管理岗位核实。','N01','仅限团队内部','不同岗位怎么看待异常？有哪些已有数据？'],
 ['示例02',11/24,'能耗报表 / 资料查看','经允许查看一份按车间汇总的报表，未留存截图。','当前汇总层级较粗，暂不能据此判断单台设备能耗。','N02','不可引用','是否有分表记录？数据能否按匿名方式提供？']
 ];
tableBody(notes,'B31:I32',31,32);notes.getRange('B31:I32').format.rowHeight=87;notes.getRange('C31:C32').setNumberFormat('hh:mm');
cell(notes,'B34','示例中的企业场景、人物代号与内容均为虚构，请勿用作调研结果。');notes.getRange('B34').format.font={name:'Microsoft YaHei',size:10,color:C.muted};

base(follow,'I31',{B:14,C:47,D:26,E:47,F:17,G:18,H:19,I:3},'复盘与跟进');
cell(follow,'B4','项目 / 团队');input(follow,'C4');cell(follow,'D4','复盘日期');input(follow,'E4');follow.getRange('E4').setNumberFormat('yyyy-mm-dd');
cell(follow,'B5','先把发现写成完整的话，再标明对应记录；还没问清的内容留在下一步，不急着下结论。');follow.getRange('B5').format.font={name:'Microsoft YaHei',size:10,color:C.muted};
const fh=['发现编号','发现 / 问题','对应记录 / 材料','下一步核实或验证','负责人','截止日期','进度'];
header(follow,'B6:H6',fh);const ft=follow.tables.add('B6:H18',true,'FieldworkFollowUps');ft.style='TableStyleMedium4';ft.showFilterButton=true;tableBody(follow,'B7:H18',7,18);follow.getRange('B7:H18').format.fill=C.input;follow.getRange('G7:G18').setNumberFormat('yyyy-mm-dd');
list(follow,'H7:H18',['未开始','进行中','已完成','暂缓']);
follow.getRange('H7:H18').conditionalFormats.add('containsText',{text:'已完成',format:{fill:'#E2EDD8',font:{color:'#315D38'}}});
follow.getRange('H7:H18').conditionalFormats.add('containsText',{text:'进行中',format:{fill:'#F8EAC4',font:{color:'#8A6426'}}});
follow.freezePanes.freezeRows(6);
band(follow,'B21:H21','当天收尾');
[['原始笔记与材料已按编号归档','记录本、录音、照片分别放好，编号能对应。'],['外发与引用范围已核对','哪些能公开，哪些只限团队内部，逐项写清。'],['不同说法与反例已留下','不一致的地方列成问题，安排下一次核实。'],['跟进任务已分工','谁去问、何时完成，填到上表。']].forEach((a,i)=>{const r=22+i;cell(follow,`B${r}`,a[0]);follow.getRange(`B${r}:D${r}`).merge();cell(follow,`E${r}`,a[1]);follow.getRange(`E${r}:F${r}`).merge();input(follow,`H${r}`);list(follow,`H${r}`,['待确认','已确认','不适用']);follow.getRange(`B${r}:H${r}`).format={wrapText:true,rowHeight:38};});
band(follow,'B27:H27','填写示例（虚构）');header(follow,'B28:H28',fh);
follow.getRange('B29:H29').values=[['示例01','目前只能确认报表按车间汇总，尚不清楚设备级数据是否存在。','示例 N01、N02','约能源管理岗位核对已有分表数据与授权范围。','队员代号','', '未开始']];follow.getRange('B29:H29').format={wrapText:true,rowHeight:83,fill:C.paper,verticalAlignment:'top'};

wb.recalculate();
for(const [sh,range,file]of [[plan,'B2:E27','plan'],[notes,'B2:I34','records'],[follow,'B2:H29','review']]){
 const image=await wb.render({sheetName:sh.name,range,scale:1.2,format:'png'});
 const bytes=new Uint8Array(await image.arrayBuffer());await fs.writeFile(path.join(out,file+'.png'),bytes);await fs.writeFile(path.join(assets,file+'.png'),bytes);
}
console.log((await wb.inspect({kind:'sheet',include:'id,name',maxChars:1500})).ndjson);
console.log((await wb.inspect({kind:'table',range:'现场记录!B30:I32',include:'values',tableMaxRows:3,tableMaxCols:8,maxChars:1800})).ndjson);
console.log((await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!',options:{useRegex:true,maxResults:20},maxChars:700})).ndjson);
const xlsx=await SpreadsheetFile.exportXlsx(wb);const file=path.join(out,'创想-企业与实地调研工作簿.xlsx');await xlsx.save(file);await fs.copyFile(file,path.join(assets,'fieldwork-workbook.xlsx'));
console.log(file);

