
/**
 * user_info
 * @type {UserInfo}
 * @description информация о пользователе
 */
export interface UserInfo { 
  /**
   * name
   * @type {string}
   */
  name: string 
  /**
   * age
   * @type {string | undefined}
   */
  age?: string
}


/**
 * access_rights
 * @type {AccessRights}
 * @description права пользователей
 */
export interface AccessRights { 
  /**
   * title
   * @type {string}
   */
  title: string 
  /**
   * rights
   * @type {string[]}
   */
  rights: string[]
}


/**
 * favorites_add_item
 * @type {FavoritesAddItem}
 * @description Добавление книги в отложенные
 */
export interface FavoritesAddItem { 
  /**
   * source_internal
   * @type {string}
   */
  source_internal: string 
  /**
   * landing_id
   * @type {string}
   */
  landing_id: string 
  /**
   * promocode_value
   * @type {string}
   */
  promocode_value: string 
  /**
   * ref_url
   * @type {string}
   */
  ref_url: string
}


/**
 * cart_remove_item
 * @type {CartRemoveItem}
 * @description Удаление книг из корзины
 */
export interface CartRemoveItem { 
  /**
   * amount
   * @type {number}
   */
  amount: number 
  /**
   * price
   * @type {number}
   */
  price: number 
  /**
   * user
   * @type {user_info | undefined}
   */
  user?: UserInfo
}


/**
 * search_empty_view
 * @type {SearchEmptyView}
 * @description Пустая выдача
 */
export interface SearchEmptyView { 
  /**
   * search_id
   * @type {string}
   */
  search_id: string 
  /**
   * query
   * @type {string}
   */
  query: string 
  /**
   * page_number
   * @type {number}
   */
  page_number: number
}


/**
 * auth_popup_view
 * @type {AuthPopupView}
 * @description Показ попапа авторизации (пример)
 */
export interface AuthPopupView { 
  /**
   * languages
   * @type {number[] | undefined}
   */
  languages?: number[] 
  /**
   * user
   * @type {user_info | undefined}
   */
  user?: UserInfo 
  /**
   * access_rights
   * @type {access_rights[]}
   */
  access_rights: AccessRights[]
}


export type EventMap = {

  basket: {

favorites_add_item: FavoritesAddItem,
cart_remove_item: CartRemoveItem},
  search: {

search_empty_view: SearchEmptyView},
  auth: {

auth_popup_view: AuthPopupView},};