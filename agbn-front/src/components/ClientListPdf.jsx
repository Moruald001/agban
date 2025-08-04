// src/pages/ClientListPDF.jsx
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 8,
  },
  section: {
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",

    borderBottom: "1px solid gray",
    paddingVertical: 4,
  },
  cell: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 4,
    wordBreak: "break-word",
  },
  header: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default function ClientListPDF({ list }) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>{list?.name}</Text>

        <View style={styles.tableRow}>
          <Text style={[styles.cell, { flex: 2 }]}>Nom</Text>
          <Text style={[styles.cell, { flex: 2 }]}>Description</Text>
          <Text style={styles.cell}>Status</Text>
          <Text style={[styles.cell, { flex: 3 }]} wrap>
            Contact
          </Text>
        </View>

        {list?.clients?.map((client) => (
          <View style={styles.tableRow} key={client.id}>
            <Text style={[styles.cell, { flex: 2 }]} wrap>
              {client.name}
            </Text>
            <Text style={[styles.cell, { flex: 2 }]} wrap>
              {client.description}
            </Text>
            <Text style={[styles.cell, {}]} wrap>
              {client.keep ? "Garder" : "Libérer"}
            </Text>
            <Text style={[styles.cell, { flex: 3 }]} wrap>
              {client.contact}
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}
