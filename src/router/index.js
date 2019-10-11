import Vue from 'vue'
import Router from 'vue-router' //路由
import Login from '@/components/login' //登录
import Index from '@/components/index' //首页
import Share from '@/components/share'  //业绩
import IncomeIndex from '@/components/incomeIndex' //累计收益
import UserIndex from '@/components/userIndex' //我的
import Rank from '@/components/rank' //龙虎榜
import RankDetails from '@/components/rankDetails' //龙虎榜详情
import IncomeList from '@/components/incomeList' //邀请伙伴
import PartnerIndex from '@/components/partnerIndex' //我的伙伴
import RecordList from '@/components/recordList' //推广记录
import Merchants from '@/components/merchants' //商户列表
import RegisterFace from '@/components/registerFace' //面对面开通
import ClassRoom from '@/components/classRoom' //交易记录
import HotActivity from '@/components/hotActivity' //机具物料
import CardIndex from '@/components/cardIndex' //办卡吧
import MyData from '@/components/myData' //我的数据
import Average from '@/components/average' //充值成功
import MyRate from '@/components/myRate' //充值失败
import BindTerminal from '@/components/bindTerminal' //充值审核中
import CardChoose from '@/components/cardChoose' //信用卡
import CardRecommend from '@/components/cardRecommend' //推荐办卡
import AwardSearch from '@/components/awardSearch' //机具采购
import CardCustomer from '@/components/cardCustomer' //客户管理
import CardPoster from '@/components/cardPoster' //宣传海报
import Wallet from '@/components/wallet' //立即提现
import Bonus from '@/components/bonus' //采购记录
import Voucher from '@/components/voucher' //机具采购详情
import Integral from '@/components/integral' //微信支付
import Approve from '@/components/approve' //实名认证
import TaskManage from '@/components/taskManage' //分享
import Service from '@/components/service' //订单详情
import Transfer from '@/components/transfer' //贷款转移
import Instruction from '@/components/instruction' //操作说明
import Setting from '@/components/setting' //设置
import TransferDetails from '@/components/transferDetails' //货款转移订单详情
import TransferDetailsS from '@/components/transferDetailsS' //货款转移订单详情(发出)
import BonusWallet from '@/components/bonusWallet' //扣款协议
import PersonalInformation from '@/components/personalInformation' //个人信息
import UpdatePwd from '@/components/updatePwd' //修改密码
import ReleaseNotes from '@/components/releaseNotes' //版本说明
import CertifiedApprove from '@/components/certifiedApprove' //实名认证已认证
import ReplaceApprove from '@/components/replaceApprove' //实名认证更换认证(可使用)
import NewsDetails from '@/components/newsDetails' //消息详情
import NewsList from '@/components/newsList' //消息通知
import WalletDetails from '@/components/walletDetails' //日结明细
import MonthlyDetails from '@/components/monthlyDetails' //月结明细
import WalletErro from '@/components/walletErro' //提现失败
import WalletSuccessful from '@/components/walletSuccessful' //提现成功
import PartnerIndexDetails from '@/components/partnerIndexDetails' //伙伴详情
import PartnerIndexDeduction from '@/components/partnerIndexDeduction' //设置抵扣参数
import Terminal from '@/components/terminal' //终端管理
import TerminalAllocated from '@/components/terminalAllocated' //已划拨终端
import TerminalManagement from '@/components/terminalManagement' //终端管理下拨页
import Rate from '@/components/rate' //商户费率
import Reimbursement from '@/components/reimbursement' //还款计划
import MentallyVersion from '@/components/mentallyVersion' //设置分润参数
import SetParameters from '@/components/setParameters' //设置分润参数
import PartnerIndexDeductionPreview from '@/components/partnerIndexDeductionPreview' //设置抵扣参数预览
import MentallyVersionPreviewO from '@/components/mentallyVersionPreviewO' //设置分润参数预览（无阶梯结算）
import MentallyVersionPreviewT from '@/components/mentallyVersionPreviewT' //设置分润参数预览
import SetParametersPreviewO from '@/components/setParametersPreviewO' //设置分润参数预览（无阶梯结算）
import SetParametersPreviewT from '@/components/setParametersPreviewT' //设置分润参数预览
import Reward from '@/components/reward' //奖励查询
import SetRate from '@/components/setRate' //固定费率设置
import Register from '@/components/register' //注册页面
import Password from '@/components/password' //找回密码
import MatReturnTo from '@/components/matReturnTo' //垫返账户页面
import MatReturnToPreview from '@/components/matReturnToPreview' //查看垫返账户页面
import Districtbase from '@/components/districtbase' //地址三级联动
import District from '@/components/district' //开户行
import MattoReturn from '@/components/mattoReturn' //垫返明细
import OnlinetopUp from '@/components/onlinetopUp' //在线充值
import Instructionscp from '@/components/instructionscp' //即付宝尊享版操作指引
import Instructionsip from '@/components/instructionsip' //即推宝服务号开通合伙人流程
import Instructionsip2 from '@/components/instructionsip2' //即推宝服务号用户装机流程
import Instructionsjfb from '@/components/instructionsjfb' //即推宝APP安装流程
import Instructionsjpos from '@/components/instructionsjpos' //即POS操作流程指引
import Instructionsjpos2 from '@/components/instructionsjpos2' //即POS终端机更新机具操作
import DailyReward from '@/components/dailyReward' //日结奖励
import MonthlyReward from '@/components/monthlyReward' //月结奖励
import StartPage from '@/components/startPage' //启动页
import AddMerchants from '@/components/addMerchants' //添加商户
import Logistics from '@/components/logistics' //物流追踪

Vue.use(Router)
//备注:写有可使用的该页面可以修改，有括号的谨慎修改
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/startPage',
      name: 'StartPage',
      component: StartPage
    }, {
      path: '/',
      name: 'Index',
      component: Index
    }, {
      path: '/share',
      name: 'Share',
      component: Share
    }, {
      path: '/incomeIndex',
      name: 'IncomeIndex',
      component: IncomeIndex
    }, {
      path: '/userIndex',
      name: 'UserIndex',
      component: UserIndex
    }, {
      path: '/rank',
      name: 'Rank',
      component: Rank
    }, {
      path: '/rankDetails/:id',
      name: 'RankDetails',
      component: RankDetails
    }, {
      path: '/incomeList',
      name: 'IncomeList',
      component: IncomeList
    }, {
      path: '/partnerIndex',
      name: 'PartnerIndex',
      component: PartnerIndex
    }, {
      path: '/recordList',
      name: 'RecordList',
      component: RecordList
    }, {
      path: '/registerFace',
      name: 'RegisterFace',
      component: RegisterFace
    }, {
      path: '/classRoom',
      name: 'ClassRoom',
      component: ClassRoom
    }, {
      path: '/hotActivity',
      name: 'HotActivity',
      component: HotActivity
    }, {
      path: '/cardIndex',
      name: 'CardIndex',
      component: CardIndex
    }, {
      path: '/myData',
      name: 'MyData',
      component: MyData
    }, {
      path: '/average',
      name: 'Average',
      component: Average
    }, {
      path: '/myRate',
      name: 'MyRate',
      component: MyRate
    }, {
      path: '/bindTerminal',
      name: 'BindTerminal',
      component: BindTerminal
    }, {
      path: '/cardChoose',
      name: 'CardChoose',
      component: CardChoose
    }, {
      path: '/cardRecommend',
      name: 'CardRecommend',
      component: CardRecommend
    }, {
      path: '/awardSearch',
      name: 'AwardSearch',
      component: AwardSearch
    }, {
      path: '/cardCustomer',
      name: 'CardCustomer',
      component: CardCustomer
    }, {
      path: '/cardPoster',
      name: 'CardPoster',
      component: CardPoster
    }, {
      path: '/wallet',
      name: 'Wallet',
      component: Wallet
    }, {
      path: '/bonus',
      name: 'Bonus',
      component: Bonus
    }, {
      path: '/voucher',
      name: 'Voucher',
      component: Voucher
    }, {
      path: '/integral',
      name: 'Integral',
      component: Integral
    }, {
      path: '/approve',
      name: 'Approve',
      component: Approve
    }, {
      path: '/taskManage',
      name: 'TaskManage',
      component: TaskManage
    }, {
      path: '/service',
      name: 'Service',
      component: Service
    }, {
      path: '/transfer',
      name: 'Transfer',
      component: Transfer
    }, {
      path: '/instruction',
      name: 'Instruction',
      component: Instruction
    }, {
      path: '/setting',
      name: 'Setting',
      component: Setting
    }, {
      path: '/transferDetails',
      name: 'TransferDetails',
      component: TransferDetails
    }, {
      path: '/bonusWallet',
      name: 'BonusWallet',
      component: BonusWallet
    }, {
      path: '/personalInformation',
      name: 'PersonalInformation',
      component: PersonalInformation
    }, {
      path: '/updatePwd',
      name: 'UpdatePwd',
      component: UpdatePwd
    }, {
      path: '/releaseNotes',
      name: 'ReleaseNotes',
      component: ReleaseNotes
    }, {
      path: '/certifiedApprove',
      name: 'CertifiedApprove',
      component: CertifiedApprove
    }, {
      path: '/replaceApprove',
      name: 'ReplaceApprove',
      component: ReplaceApprove
    }, {
      path: '/newsDetails/:id',
      name: 'NewsDetails',
      component: NewsDetails
    }, {
      path: '/newsList',
      name: 'NewsList',
      component: NewsList
    }, {
      path: '/walletDetails',
      name: 'WalletDetails',
      component: WalletDetails
    }, {
      path: '/walletErro',
      name: 'WalletErro',
      component: WalletErro
    }, {
      path: '/walletSuccessful',
      name: 'WalletSuccessful',
      component: WalletSuccessful
    }, {
      path: '/partnerIndexDetails',
      name: 'PartnerIndexDetails',
      component: PartnerIndexDetails
    }, {
      path: '/partnerIndexDeduction',
      name: 'PartnerIndexDeduction',
      component: PartnerIndexDeduction
    }, {
      path: "/terminal",
      name: 'Terminal',
      component: Terminal
    }, {
      path: '/terminalAllocated',
      name: 'TerminalAllocated',
      component: TerminalAllocated
    }, {
      path: '/terminalManagement',
      name: 'TerminalManagement',
      component: TerminalManagement
    }, {
      path: '/rate',
      name: 'Rate',
      component: Rate
    }, {
      path: '/reimbursement',
      name: 'Reimbursement',
      component: Reimbursement
    }, {
      path: '/mentallyVersion',
      name: 'MentallyVersion',
      component: MentallyVersion
    }, {
      path: '/setParameters',
      name: 'SetParameters',
      component: SetParameters
    }, {
      path: '/partnerIndexDeductionPreview',
      name: 'PartnerIndexDeductionPreview',
      component: PartnerIndexDeductionPreview
    }, {
      path: '/mentallyVersionPreviewO',
      name: 'MentallyVersionPreviewO',
      component: MentallyVersionPreviewO
    }, {
      path: '/mentallyVersionPreviewT',
      name: 'MentallyVersionPreviewT',
      component: MentallyVersionPreviewT
    }, {
      path: '/setParametersPreviewO',
      name: 'SetParametersPreviewO',
      component: SetParametersPreviewO
    }, {
      path: '/setParametersPreviewT',
      name: 'SetParametersPreviewT',
      component: SetParametersPreviewT
    }, {
      path: '/reward',
      name: 'Reward',
      component: Reward
    }, {
      path: '/setRate',
      name: 'SetRate',
      component: SetRate
    }, {
      path: '/register',
      name: 'Register',
      component: Register
    }, {
      path: '/password',
      name: 'Password',
      component: Password
    }, {
      path: '/matReturnTo',
      name: 'MatReturnTo',
      component: MatReturnTo
    }, {
      path: '/matReturnToPreview',
      name: 'MatReturnToPreview',
      component: MatReturnToPreview
    }, {
      path: '/districtbase',
      name: 'Districtbase',
      component: Districtbase
    }, {
      path: '/district',
      name: 'District',
      component: District
    }, {
      path: '/mattoReturn',
      name: 'MattoReturn',
      component: MattoReturn
    }, {
      path: '/onlinetopUp',
      name: 'OnlinetopUp',
      component: OnlinetopUp
    }, {
      path: '/instructionscp',
      name: 'Instructionscp',
      component: Instructionscp
    }, {
      path: '/instructionsip',
      name: 'Instructionsip',
      component: Instructionsip
    }, {
      path: '/instructionsip2',
      name: 'Instructionsip2',
      component: Instructionsip2
    }, {
      path: '/instructionsjfb',
      name: 'Instructionsjfb',
      component: Instructionsjfb
    }, {
      path: '/instructionsjpos',
      name: 'Instructionsjpos',
      component: Instructionsjpos
    }, {
      path: '/instructionsjpos2',
      name: 'Instructionsjpos2',
      component: Instructionsjpos2
    }, {
      path: '/merchants',
      name: 'Merchants',
      component: Merchants
    }, {
      path: '/dailyReward',
      name: 'DailyReward',
      component: DailyReward
    }, {
      path: '/monthlyReward',
      name: 'MonthlyReward',
      component: MonthlyReward
    }, {
      path: '/monthlyDetails',
      name: 'MonthlyDetails',
      component: MonthlyDetails
    }, {
      path: '/transferDetailsS',
      name: 'TransferDetailsS',
      component: TransferDetailsS
    }, {
      path: '/addMerchants',
      name: 'AddMerchants',
      component: AddMerchants
    }, {
      path: '/logistics',
      name: 'Logistics',
      component: Logistics
    }
  ]
})
