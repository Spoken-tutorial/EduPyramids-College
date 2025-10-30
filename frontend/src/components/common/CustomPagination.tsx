import React from "react";
import { Pagination, Stack, Typography } from "@mui/material";

type CustomPaginationProps = {
  /** Current page number (1-based) */
  page: number;
  /** Total items (from DRF `count`) */
  count: number;
  /** Page size (same as DRF `PAGE_SIZE`) */
  pageSize: number;
  /** Callback when user changes page */
  onPageChange: (newPage: number) => void;

}

export default function CustomPagination({
    page,
    count,
    pageSize,
    onPageChange
}: CustomPaginationProps){
    // alert('0');
    const totalPages = Math.ceil(count / pageSize);

    if (count === 0) return null;

    const startIndex = (page -1) * pageSize + 1;
    const endIndex = Math.min(page * pageSize, count);
    // alert('1');
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mt: 2}}>

        {/* Info text */}
            <Typography variant="body2" color="text.secondary">
                Showing <strong>{startIndex}</strong>–<strong>{endIndex}</strong> of{" "}
                <strong>{count}</strong>
            </Typography>
        {/* MUI Pagination */}
            <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => onPageChange(value)}
                color="primary"
                shape="rounded"
            />
        </Stack>
    );
}