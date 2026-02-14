/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *   // => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */
export function createThaliDescription(thali) {
  // Validation
  if (
    typeof thali !== "object" ||
    thali === null ||
    typeof thali.name !== "string" ||
    !Array.isArray(thali.items) ||
    typeof thali.price !== "number" ||
    typeof thali.isVeg !== "boolean"
  ) {
    return "";
  }

  // 1. Format Name
  const name = thali.name.toUpperCase();

  // 2. Format Veg/Non-Veg
  const type = thali.isVeg ? "(Veg)" : "(Non-Veg)";

  // 3. Format Items (join with comma AND space)
  const itemsList = thali.items.join(", ");

  // 4. Format Price
  const priceTag = thali.price.toFixed(2);

  // Combine
  return `${name} ${type} - Items: ${itemsList} - Rs.${priceTag}`;
}

export function getThaliStats(thalis) {
  // Validation: Must be a non-empty array
  if (!Array.isArray(thalis) || thalis.length === 0) {
    return null;
  }

  // Calculate Prices array once to use for min/max/avg
  const prices = thalis.map((t) => t.price);

  // Calculate Average
  const totalSum = prices.reduce((acc, curr) => acc + curr, 0);
  const avg = totalSum / thalis.length;

  return {
    totalThalis: thalis.length,
    vegCount: thalis.filter((t) => t.isVeg).length,
    nonVegCount: thalis.filter((t) => !t.isVeg).length,
    avgPrice: avg.toFixed(2), // Returns string as per requirement
    cheapest: Math.min(...prices), // Spread operator expands array elements
    costliest: Math.max(...prices),
    names: thalis.map((t) => t.name),
  };
}

export function searchThaliMenu(thalis, query) {
  // Validation
  if (!Array.isArray(thalis) || typeof query !== "string") {
    return [];
  }

  const lowerQuery = query.toLowerCase();

  return thalis.filter((thali) => {
    // Check Name
    const nameMatch = thali.name.toLowerCase().includes(lowerQuery);
    // Check Items (returns true if ANY item matches)
    const itemMatch = thali.items.some((item) =>
      item.toLowerCase().includes(lowerQuery)
    );

    return nameMatch || itemMatch;
  });
}

export function generateThaliReceipt(customerName, thalis) {
  // Validation
  if (
    typeof customerName !== "string" ||
    !Array.isArray(thalis) ||
    thalis.length === 0
  ) {
    return "";
  }

  // 1. Calculate Total Price
  const total = thalis.reduce((sum, t) => sum + t.price, 0);

  // 2. Generate Line Items
  const lineItems = thalis
    .map((t) => `- ${t.name} x Rs.${t.price}`)
    .join("\n");

  // 3. Construct Final Receipt
  return `THALI RECEIPT
---
Customer: ${customerName.toUpperCase()}
${lineItems}
---
Total: Rs.${total}
Items: ${thalis.length}`;
}