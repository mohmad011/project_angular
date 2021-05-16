// USA
import USER_BADGE from './ar/badge';
import ATTENDANCE from './ar/attendence';
import TICKETING from './ar/ticketing';
import TICKET from './ar/ticket';
import HOSPITALITY from './ar/hospitality';
import TAG from './ar/tag';
import CERTIFICATE from './ar/certificate';
import EVENT from './ar/event';
import SPONSOR from './ar/sponsor';
import SPEAKER from './ar/speaker';
import SERVICE from './ar/service';
import SETTINGS from './ar/setting';
import STATUS from './ar/status';
import BLOG from './ar/blog';
import LOGISTICS from './ar/logistics';
import HEADER from './ar/logistics';
import CUSTOMERS from './ar/logistics';
import INVOICES from './ar/logistics';
import TASKS from './ar/taskProject';
import SEVERITY from './ar/severity';
import TASK_STATUS from './ar/taskstatus';
import PROJECTS from './ar/project';
import REQUISITIONS from './ar/logistics';
import ECOMMERCE from './ar/logistics';
import ORGANIZER from './ar/organizer';
import SURVEY from './ar/survey'
import JOIN_REQUEST from './ar/join-request'
import EVENT_DETAILS from './ar/event-details';
import ADMIN from './ar/admin'
import CONTACT_US from './ar/contactUs'
import AGENDA from './ar/agenda';
import EXHIBITION from './ar/exhibition'
import ACCOMMODATION from './ar/accommodation';
import TUTORIAL from './ar/tutorial';
import TOURISM from './ar/tourism';
import TOURISM_REQUEST from './ar/tourism-request';
import TRANSPORTATION from './ar/transportation';
import TRANSPORTATION_REQUEST from './ar/transportation-request';
import EVENT_ACCESS from './ar/event-access';

export const locale = {
	lang: 'ar',
	data: {
		EXPORT: 'تصدير المعلومات',
		EXPORTFILES: 'الملفات المصدره',
		CREATECERTIFICATES: 'انشاء شهادات',
		SENDCERTIFICATES: 'ارسال شهادات',
		SENDEMAILS: 'ارسال البريد الالكترونى',
		SENDSURVEIES: 'ارسال استعراض',
		SENDSMS: 'ارسال رساله',
		TRANSLATOR: {
			SELECT: 'اختر لغتك',
		},
		MENU: {
			NEW: 'جديد',
			ACTIONS: 'التحكم',
			CREATE_POST: 'إنشاء بوست جديد',
			PAGES: 'الصفحات',
			FEATURES: 'المميزات',
			APPS: 'التطبيقات',
			DASHBOARD: 'الرئيسية',
			NEW_TASK: 'خدمة جديدة'
		},
		AUTH: {
			GENERAL: {
				OR: 'أو',
				SUBMIT_BUTTON: 'إرسال',
				NO_ACCOUNT: 'ليس لديك حساب',
				SIGNUP_BUTTON: 'تسجيل حساب',
				FORGOT_BUTTON: 'نسيت كلمة المرور',
				BACK_BUTTON: 'تراجع',
				MY_PROFILE: 'حسابى',
				PROFILE_SUBHEADER: 'إعدادات الحساب والمزيد'
			},
			LOGIN: {
				TITLE: 'تسجيل الدخول',
				BUTTON: 'تسجيل الدخول',
				SAVE: 'حفظ',
				RESET_PASSWORD: 'اعادة تعيين كلمة المرور',
				DO_NOT_HAVE_ACCOUNT: 'ليس  لديك حساب ؟'
			},
			FORGOT: {
				TITLE: 'نسيت كلمة المرور؟',
				DESC: 'أدخل البريد الالكترونى لإعادة تعيين كلمة السر',
				SUCCESS: 'تم تعيين كلمة السر بنجاح.'
			},
			REGISTER: {
				TITLE: 'إنشاء حساب',
				DESC: 'أدخل بياناتك لإنشاء حساب',
				SUCCESS: 'تم انشاء الحساب بنجاح',
				AGREE_TERMS: 'أوافق على  ',
				TERMS_CONDITIONS: 'الشروط والأحكام',
				WELCOME_USER: 'مرحبا بك فى خدماتنا'
			},
			INPUT: {
				EMAIL: 'البريد الإلكترونى',
				EMAIL_USERNAME: 'البريد الإلكترونى او رقم الهاتف',
				FULLNAME: 'الإسم كامل',
				PASSWORD: 'كلمة المرور',
				CONFIRM_PASSWORD: 'تأكيد كلمة المرور',
				USERNAME: 'إسم المستخدم',
				CODE: 'رمز التفعيل',
				SHOP_NAME: 'اسم المتجر',
				MOBILE: 'رقم الهاتف',
				CITY: 'المدينة',
				REGION: 'المنطقة',
				COUNTRY: 'البلد',
				ADDRESS: 'العنوان',
				TAX_NUMBER: 'الرقم الضريبي',
				COMMERCIAL_NUMBER: 'الرقم التجارى',
				BIRTH_DATE: 'اختر تاريخ الميلاد',
				LAST_NAME: 'الإسم الأخير',
				FIRST_NAME: 'الإسم الأول',
				SHOP_INFO: 'بيانات المتجر',
				USER_INFO: 'بياناتى الشخصية',
				PROFILE: 'حسابى',
				BLOCKED: 'حظر الحساب'
			},
			VALIDATION: {
				INVALID: ' غير صالح',
				REQUIRED: '{{name}} مطلوب',
				MIN_LENGTH: '{{name}} الحد الأدنى هو {{min}}',
				AGREEMENT_REQUIRED: 'قبول الأحكام والشروط مطلوب',
				NOT_FOUND: 'المطلوب غير موجود{{name}}',
				INVALID_LOGIN: 'تفاصيل الدخول غير صحيحة',
				REQUIRED_FIELD: 'هذا الحقل مطلوب',
				MIN_LENGTH_FIELD: 'الحد الأدنى لطول الحقل:',
				MAX_LENGTH_FIELD: 'أقصى طول للحقل:',
				INVALID_FIELD: 'البريد الإلكترونى غير صالح',
				MOBILE_IS: 'رقم الهاتف ',
				EMAIL_EXISTED: 'البريد الإلكترونى موجود بالفعل',
				BACKEND_ERROR: 'حدث خطأ بالشبكة, حاول مرة اخرى',
				EMAIL_WRONG: ' اسم المستخدم او كلمة المرور غير صحيحة',
				CODE_ERROR: 'كود التفعيل غير صحيح',
				PASSWORDS_MATCH: 'تأكيد كلمة المرور لا تتوافق مع كلمة المرور',
				MOBILE_EXIST: 'رقم الهاتف مسجل لدى حساب آخر',
				MUST_ACCEPT_TERMS: 'يحب الموافقة على الشروط',
				USER_BLOCKED: 'تم حظر حسابك , يرجى الرجوع إلى الادارة '
			}
		},
		USER_MANAGEMENT: {
			GENERAL: {
				FIELDS: 'العناصر',
				BACK: 'رجوع',
				SAVE: 'حفظ',
				SAVE_CONTINUE: 'حفظ واستمرار',
				BACK_VENDORS_LIST: 'الرجوع الى الماركات',
				BACK_USERS_LIST: 'الرجوع الى قائمة المستخدمين',
				BACK_TO_HOME: 'الرجوع الى الصفحة الرئيسية',
				CHANGE_EMAIL: 'تغيير البريد الإليكترونى',
				CHANGE_MOBILE: 'تغيير رقم الهاتف',
				CHANGE_PASSWORD: 'تغيير كلمة المرور',
				ADD_COUPON: 'إضافة كوبون',
				END_SUBSCRIPTION: 'تم انتهاء اشتراكك',
				WAIT_END_SUBSCRIPTION: 'سيتم انهاء اشتراكك خلال',
				DAYS: 'ايام',
				USERDATA: 'بيانات المستخدم',
				ATTENSDATA: 'بيانات الحضور',
				MEETINGS: 'الاجتماعات',
				INVITATIONS: 'الدعاوي',
				SENT: 'المرسل',
				RECEIVED: 'المستلم',
				FAVORITES: 'المفضلات'
			},
			INPUT: {
				ENTER_NAME: 'ادخل الاسم',
				ENTER_FIRST_NAME: 'ادخل الاسم الأول',
				ENTER_MIDDLE_NAME: 'ادخل الاسم الأوسط',
				SELECT_TITLE: 'اختر اللقب',
				SELECT_AVATAR: 'اختر صورة الحساب',
				SELECT_COUNTRY: 'اختر البلد',
				SELECT_NATIONALITY: 'اختر الجنسية',
				SELECT_INDUSTRY: 'اختر مجال العمل',
				SELECT_GENDER: 'اختر النوع',
				ENTER_COMPANY: 'ادخل اسم الشركة',
				ENTER_POSITION: 'ادخل المنصب',
				ENTER_INDUSTRY: 'ادخل مجال العمل',
				ENTER_ABOUT: 'ادخل نبذة',
				ENTER_INTERESTS: 'ادخل مجالات الاهتمام',
				ENTER_LAST_NAME: 'أدخل الإسم الأخير',
				ENTER_EMAIL: 'أدخل البريد الإلكترونى',
				CHANGE_PASSWORD: 'تغيير كلمة المرور',
				ENTER_PASSWORD: 'أدخل كلمة المرور',
				BIRTH_DATE: 'اختر تاريخ الميلاد',
				START_DATE: ' اختار التاريخ',
				GENERATE_PASSWORD: 'إنشاء كلمة المرور',
				ENTER_MOBILE: 'أدخل رقم الهاتف',
				ENTER_COMMERICAL_NUMBER: 'أدخل الرقم التجارى',
				ENTER_TAX_NUMBER: 'أدخل الرقم الضريبى',
				ENTER_ADDRESS: 'أدخل العنوان',
				ENTER_COUNTRY: 'أدخل البلد',
				ENTER_CITY: 'أدخل المدينة',
				ENTER_REGION: 'أدخل المنطقة',
				SELECT_TYPE: 'اختر النوع',
				USER_AVATAR: 'صورة المستخدم',
				SHOW_PASSWORD: 'أظهر كلمة السر',
				HIDE_PASSWORD: 'اخفى كلمة السر',
				UPDATE_AVATAR: 'تغيير صورة البروفايل',
				ENTER_COUPON: 'أدخل الكوبون',
				OPTION: 'معلومات',
				ENTER_SUBJECT:'ادخل العنوان',
				SELECT_TIME_FORMAT: 'اختر تنسيق الوقت',
                SELECT_TIME_ZONE: 'اختر المنطقة الزمنية',
			},
			VALIDATION: {
				FIRST_NAME_IS: 'الإسم الأول',
				MIDDLE_NAME_IS: 'الاسم الأوسط',
				TITLE_IS: 'اللقب',
				NATIONALITY_IS: 'الجنسية',
				INDUSTRY_IS: 'مجال العمل',
				INTERESTS_IS: 'مجالات الاهتمام',
				NAME_IS: 'الاسم',
				COMPANY_IS: 'اسم الشركة',
				VALID_REQUIRED: 'مطلوب',
				LAST_NAME_IS: 'الإسم الأخير',
				EMAIL_IS: 'البريد الإلكترونى',
				PASSWORD_IS: 'كلمة المرور',
				MOBILE_IS: 'رقم الهاتف',
				BIRTH_DATE_IS: 'تاريخ الميلاد',
				START_DATE_IS: 'تاريخ البدايه',
				SUBMIT_ERROR: 'قم بتغيير بعض الأشياء وحاول الإرسال مرة أخرى.',
				COMMERICAL_NUMBER_IS: 'الرقم التجارى',
				TAX_NUMBER_IS: 'الرقم الضريبى',
				ADDRESS_IS: 'العنوان',
				COUNTRY_IS: 'البلد',
				CITY_IS: 'الدينة',
				REGION_IS: 'المنطقة',
				ONE_NAME_IS: 'اسم واحد على الاقل ',
				COUPON_IS: 'الكوبون',
				COUPON_WRONG: 'هذا الكوبون غير صالح',
				COUPON_EXIST: 'هذا الكوبون موجود بالفعل'
			},
			LIST: {
				USER_SAVED: 'تم حفظ المستخدم بنجاح',
				NEW_USER_SAVED: 'تم إضافة مستخدم جديد بنجاح',
				USER_MANAGEMENT: 'إدارة المستخدمين',
				USERS_LIST: 'قائمة المستخدمين',
				USERS: 'المستخدمين',
				CREATE_USER: 'إنشاء مستخدم',
				EDIT_USER: 'تعديل مستخدم',
				USER_DELETE: 'مسح مستخدم',
				CONFIRM_USER_DELETE: 'هل أنت متأكد أنك تريد مسح هذا المستخدم؟',
				WAIT_USER_DELETE: 'يتم مسح المستخدم....',
				DELETED_USER_MESSAGE: 'تم مسح المستخدم',
				CREATE_NEW_USER: 'إنشاء مستخدم جديد',
				NEW_USER: 'مستخدم جديد',
				SEARCH: 'بحث',
				IN_ALL_FIELDS: 'ف جميع الحقول',
				FETCHED_SELECTED: 'تم إرجاع نتيجة البحث',
				FETCHED_SELECTED_USERS: 'Fetch selected users',
				FIRST_NAME: 'الإسم الأول',
				LAST_NAME: 'الإسم الأخير',
				PLEASE_WAIT: 'من فضلك انتظر....',
				NO_RECORDS: 'لا توجد معلومات',
				ACTIONS: 'التحكم',
				USER_TYPE: 'نوع المستخدم',
				TAX_NUMBER: 'الرقم الضريبى',
				REGION: 'المنطقة',
				COMMERICAL_NUMBER: 'الرقم التجارى',
				SHOP_NAME: 'اسم المتجر',
				BIRTH_DATE: 'تاريخ الميلاد',
				ADDRESS: 'العنوان',
				MOBILE: 'رقم الهاتف',
				EMAIL: 'البريد الإلكترونى',
				CREATE_DATE: 'تاريخ الإنشاء',
				EMAIL_UPDATED: 'تم تغيير الإيميل',
				MOBILE_UPDATED: 'تم تغيير رقم الهاتف',
				PASSWORD_UPDATED: 'تم تغيير كلمة المرور',
				BLOCK: 'حظر الحساب',
				CONFIRM_USER_BLOCK: 'هل انت متأكد من حظر الحساب؟',
				WAIT_USER_BLOCK: 'جاري الحظر ........',
				MESSAGE_USER_BLOCK: 'تم حظر الحساب',
				UN_BLOCK: 'إلغاء الحظر ',
				CONFIRM_USER_UN_BLOCK: 'هل انت من الغاء حظر هذا الحساب؟',
				WAIT_USER_UN_BLOCK: 'جاري الغاء حظر الحساب .....',
				MESSAGE_USER_UN_BLOCK: 'تم الغاء حظر الحساب ',
				OK: 'موافق',
				CANCEL: 'الغاء',
				USER_AVATAR: 'صورة المستخدم',
				COUPON_ADDED: 'تم إضافة الكوبون, سجّل الدخول مرة أخرى لبدء استخدامه',
				EXPORT: 'اصدار',
				FILTER: 'اظهار',
				SENDJOB: 'ارسال',
			},
			MEETING: {
				TITLE: 'العنوان',
				DESCRIPTION: 'الوصف',
				DATETIME: 'التاريخ و الزمان',
				DURATION: 'المدة'
			},
			INVITATION: {
				TITLE: 'عنوان الاجتماع',
				STATUS: 'الحالة'
			},
			FAVORITES: {
				TYPE: 'النوع',
				LINK: 'الرابط'
			}
		},
		TASK_MANAGEMENT: {
			LIST: {
				TASK_MANAGEMENT: "Task Managment"
			}
		},
		USER_BADGE,
		ATTENDANCE,
		BLOG,
		TICKETING,
		TICKET,
		TAG,
		CERTIFICATE,
		EVENT,
		SPEAKER,
		ORGANIZER,
		SPONSOR,
		LOGISTICS,
		HOSPITALITY,
		SERVICE,
		SETTINGS,
		HEADER,
		CUSTOMERS,
		STATUS,
		INVOICES,
		REQUISITIONS,
		TASKS,
		ECOMMERCE,
		SURVEY,
		JOIN_REQUEST,
		EVENT_DETAILS,
		ADMIN,
		CONTACT_US,
		TASK_STATUS,
		SEVERITY,
		PROJECTS,
		AGENDA,
		EXHIBITION,
		ACCOMMODATION,
		TUTORIAL,
		TOURISM,
		TOURISM_REQUEST,
		TRANSPORTATION,
		TRANSPORTATION_REQUEST,
		EVENT_ACCESS

	}
}
