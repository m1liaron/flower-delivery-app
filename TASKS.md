# 🌸 Flower Delivery App

This project is divided into three levels of complexity: **Base**, **Middle**, and **Advanced**.  

---

## 🟢 Base Level

### Flower Shops Page
- [x] Display a list of flower shops.
- [x] Allow users to choose a flower shop.
- [x] Allow adding bouquets or single flowers to the cart (data comes from the database).

### Shopping Cart Page
- [x] Display all added products in the cart.
- [x] Allow users to remove products.
- [x] Allow users to change product quantities.
- [x] Add inputs for **email**, **phone number**, and **delivery address**.
- [x] Save the order in the database after the user clicks **Submit**.

---

## 🟡 Middle Level

### Flower Shops Page
- [x] ✅ Everything from the **Base Level**.
- [x] Add sorting by **price** and/or **date added**.
- [x] Add ability to mark bouquets as **favorites**.
- [x] Display favorite flowers first when sorting.

### Shopping Cart Page
- [x] ✅ Everything from the **Base Level**.
- [x] Save the cart in **local storage**.
- [x] When creating an order, include **date and time** adjusted to the customer’s **time zone**.

### Order Details Page
- [x] After placing an order, automatically redirect the user to an **Order Details Page**.
- [x] Show the following information:
  - [x] Unique **order ID**
  - [x] List of products
  - [x] **Total price**
  - [x] **Delivery address**
  - [x] **Date and time** (adjusted to the user’s time zone)

---

## 🔴 Advanced Level

### Flower Shops Page
- [x] ✅ Everything from the **Middle Level**.
- [x] Add **pagination** for large flower catalogs.

### Shopping Cart Page
- [x] ✅ Everything from the **Middle Level**.

### Google Maps Integration
- [ ] Add a Google Maps component.
- [ ] Let users choose delivery address by placing a **pin** on the map or by typing an address (display it on the map).
- [ ] Show the flower shop from which the user ordered flowers on the map.
- [ ] (Extra) Show the **route** from shop to user’s address and **approximate delivery time**.
- [ ] (Extra) Add **captcha** after clicking the "Create order" button.

---

## 💡 Additional Ideas (Optional)

- [ ] **Orders History Page**: Users can search for orders using email, phone number, or order ID.
- [ ] **Coupons Page**: Display all available coupons. Users can apply them on the Shopping Cart Page for discounts.

---
