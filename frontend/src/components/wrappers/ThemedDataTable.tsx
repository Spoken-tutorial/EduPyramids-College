// ThemedDataTable.tsx
import React from "react";
import DataTable, {
  TableProps,
  TableStyles,
} from "react-data-table-component";
import { tableStyles as defaultTableStyle } from "../customStyles";

interface ThemedDataTableProps<T> extends TableProps<T> {
  customStyles?: TableStyles;
}

export default function ThemedDataTable<T>({
  customStyles,
  ...props
}: ThemedDataTableProps<T>) {
  const merged: TableStyles = {
    ...defaultTableStyle,
    ...customStyles,
  };

  return <DataTable {...props} customStyles={merged} />;
}
