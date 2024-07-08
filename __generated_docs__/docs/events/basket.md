---
sidebar_position: 2
--- 
# basket


## favorites_add_item

Добавление книги в отложенные

| Поле | Тип |
|-|-|
| **source_internal*** | *[string](/docs/types#string)* |
| **landing_id*** | *[string](/docs/types#string)* |
| **promocode_value*** | *[string](/docs/types#string)* |
| **ref_url*** | *[string](/docs/types#string)* |


✅ Событие реализовано


<details>
  <summary>Code example</summary>
  ```typescript
  trackEvent("basket.favorites_add_item", {
    source_internal: "some string",
    landing_id: "some string",
    promocode_value: "some string",
    ref_url: "some string"
  }); 
  ```
</details>




## cart_remove_item

Удаление книг из корзины

| Поле | Тип |
|-|-|
| **amount*** | *[number](/docs/types#number)* |
| **price*** | *[number](/docs/types#number)* |
| **user** | *[user_info](/docs/types#user_info)* |


✅ Событие реализовано


<details>
  <summary>Code example</summary>
  ```typescript
  trackEvent("basket.cart_remove_item", {
    amount: 100,
    price: 100,
    user: "TODO: compound and arrays"
  }); 
  ```
</details>



