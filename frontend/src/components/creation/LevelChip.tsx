import { Chip } from "@mui/material";

export default function LevelChip({ level }: {level: "Basic" | "Intermediate" | "Advanced" }) {
    const colorMap = {
        Basic: "success",
        Intermediate: "warning",
        Advanced: "error",
    } as const;
    return <Chip label={level} color={colorMap[level]} size="small" />;
}