---
sidebar_position: 2
--- 
# search


## search_empty_view

Пустая выдача

| Поле | Тип |
|-|-|
| **search_id*** | *[string](/docs/types#string)* |
| **query*** | *[string](/docs/types#string)* |
| **page_number*** | *[number](/docs/types#number)* |


✅ Событие реализовано


<details>
  <summary>Code example</summary>
  ```typescript
  trackEvent("search.search_empty_view", {
    search_id: "some string",
    query: "some string",
    page_number: 100
  }); 
  ```
</details>



