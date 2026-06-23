# Apex POS - Verification & Testing Checklist

This document contains a structured list of test cases to verify the entire full-stack Point of Sale (POS) system.

---

## 🔐 1. Authentication & Security Testing

- [ ] **Initial Redirect:** Open the browser to `http://localhost:5173/`. Verify you are automatically redirected to `http://localhost:5173/login`.
- [ ] **Invalid Login:** Enter a dummy email (`fake@test.com`) and password (`wrongpass`). Verify a failure toast appears.
- [ ] **Valid Admin Login:** Log in using valid admin details. Verify a success welcome toast appears and you are redirected to the Dashboard.
- [ ] **Role-based Navigation:**
  - Verify that when logged in as an **Admin**, the "Manage Users" option is visible in the top navbar.
  - Verify that when logged in as a standard **Cashier (USER)**, the "Manage Users" menu option is completely hidden.
- [ ] **Route Guarding:** Log out, then try to manually navigate to `http://localhost:5173/dashboard` or `http://localhost:5173/users`. Verify the app redirects you back to `/login`.

---

## 👤 2. User Management Testing (Admin Only)

- [ ] **Access Guard:** Navigate to `http://localhost:5173/users`. Verify the registration form and users list load.
- [ ] **Cashier Registration:**
  - Enter name: `Cashier One`
  - Email: `cashier1@pos.com`
  - Password: `password123`
  - Select Role: `Cashier (USER)`
  - Click **Create User Account**. Verify a success toast appears and the user shows up in the user list on the right with a blue `Cashier` badge.
- [ ] **Admin Registration:** Register another user with email `admin2@pos.com` and select `Administrator (ADMIN)` role. Verify they appear in the list with an amber `Admin` badge.
- [ ] **User Deletion:** Click the red trash icon on `cashier1@pos.com`. Verify the user disappears from the list and database.

---

## 📂 3. Category Management Testing

- [ ] **Category Form:** Navigate to `http://localhost:5173/category`.
- [ ] **Image Upload:** Click the upload placeholder box, select an image. Verify a preview of the image is shown immediately inside the box.
- [ ] **Add Category:** Enter Name: `Burgers`, Description: `Delicious grilled patties`, select an image, and click **Submit**. Verify success toast appears and card is added to the categories list.
- [ ] **Delete Category:** Click the trash icon on the category card. Verify it is successfully deleted.

---

## 🛍 4. Item Management Testing

- [ ] **Item Form:** Navigate to `http://localhost:5173/items`.
- [ ] **Dynamic Category Select:** Open the Category dropdown. Verify that the categories you created (e.g. `Burgers`) are dynamically listed.
- [ ] **Add Product:**
  - Upload a food product image.
  - Enter Name: `Classic Beef Burger`
  - Select Category: `Burgers`
  - Enter Price: `199.00`
  - Enter Description: `Juicy single patty burger with cheddar`
  - Click **Add Product**. Verify success toast appears and the item details (name, category name, price badge, image) show up in the product grid.
- [ ] **Delete Product:** Click the trash icon on an item card. Verify it is deleted successfully.

---

## 🛒 5. POS Terminal Checkout Testing (Explore Page)

- [ ] **Explore Page Setup:** Navigate to `http://localhost:5173/explore`.
- [ ] **Horizontal Category Filter:**
  - Click on different horizontal category capsules. Verify the product grid on the left filters items accordingly.
  - Click "All Products". Verify all products are displayed.
- [ ] **Add to Cart:** Click the **Add** button on `Classic Beef Burger`. Verify the item is added to the Cart Summary in the right panel.
- [ ] **Quantity Manipulation:**
  - Click `+` button in the cart. Verify quantity becomes `2` and pricing math updates.
  - Click `-` button in the cart until quantity is `0`. Verify the product is removed from the cart.
- [ ] **Tax & Total Math Verification:**
  - Add 2 Classic Beef Burgers (Price: ₹199 each).
  - Verify Subtotal displays: `₹398.00`
  - Verify Tax (GST 18%) displays: `₹71.64`
  - Enter Discount: `50.00`
  - Verify Grand Total displays: `₹419.64` (`398 + 71.64 - 50`)
- [ ] **Checkout Validation:** Clear cart, enter name, click **Place Order**. Verify validation blocks checkout.
- [ ] **Successful Checkout:** Add items, enter Name `Rajesh Kumar`, Mobile `9999988888`, click **Place Order**. Verify success notification and cart clear.

---

## 📊 6. Sales Dashboard Analytics Testing

- [ ] **Dashboard Stats:** Navigate to `http://localhost:5173/dashboard`.
- [ ] **Metrics Validation:** Verify the totals count correctly:
  - **Total Revenue:** Matches the checkout total from Rajesh Kumar's order.
  - **Sales Count:** Reflects `1` checkout transaction.
  - **Active Categories / Products:** Displays the database category and item counts.
- [ ] **Recent Transactions Table:** Check that राजेश Kumar's checkout transaction is listed with Date/Time, Items count, and Total.
- [ ] **Invoice Receipt Modal:** Click the **Details** button on Rajesh Kumar's row. Verify the glassmorphic Receipt modal popup displays accurate transaction breakdowns. Click **Close Receipt** to dismiss.
