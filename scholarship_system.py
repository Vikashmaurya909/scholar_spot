import pandas as pd
from fuzzywuzzy import fuzz



print("Script started...")

df = pd.read_csv("scholar.csv")
print("CSV loaded. Rows:", len(df))
print(df.head())
# Load CSV
df = pd.read_csv("scholar.csv")

# -----------------------------
# 1️⃣ Recommendation Function
# -----------------------------
def recommend_scholarship(state, category, qualification, income, type_):
    try:
        filtered = df[
            (df["State"].str.lower() == state.lower()) &
            (df["Category"].str.lower() == category.lower()) &
            (df["Qualification"].str.lower() == qualification.lower()) &
            (df["Type"].str.lower() == type_.lower()) &
            (pd.to_numeric(df["Income"], errors="coerce") >= income)
        ]

        if filtered.empty:
            return "❌ No scholarship found"

        result = filtered.iloc[0]
        return {
            "Name": result["Name"],
            "Description": result["Description"],
            "LINKS": result["LINKS"]
        }

    except Exception as e:
        return {"error": str(e)}


# -----------------------------
# 2️⃣ Chatbot / Fuzzy Search
# -----------------------------
def search_scholarships(query):
    query = query.lower()
    results = []

    for _, row in df.iterrows():
        fields = [
            str(row["Name"]),
            str(row["Category"]),
            str(row["Qualification"]),
            str(row["Description"]),
            str(row["State"]),
            str(row["Type"])
        ]

        if any(fuzz.partial_ratio(query, field.lower()) > 80 for field in fields):
            results.append({
                "Name": row["Name"],
                "Qualification": row["Qualification"],
                "Category": row["Category"],
                "LINKS": row["LINKS"]
            })

    if not results:
        return "❌ No matching scholarships found"

    return results[:3]   # top 3 like before


# -----------------------------
# 3️⃣ Direct Run (CLI)
# -----------------------------
if __name__ == "__main__":

    print("\n--- Scholarship Recommendation ---")
    rec = recommend_scholarship(
        state="Uttar Pradesh",
        category="OBC",
        qualification="Undergraduate",
        income=200000,
        type_="Government"
    )
    print(rec)

    print("\n--- Chatbot Search ---")
    chat = search_scholarships("engineering obc")
    print(chat)
