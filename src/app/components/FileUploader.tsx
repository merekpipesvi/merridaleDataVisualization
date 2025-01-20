import React from "react";
import { FileInput, Button, Stack, Text, Group, Image } from "@mantine/core";

interface FileUploaderProps {
    file: File | null;
    setFile: (file: File | null) => void;
    onUpload: () => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ file, setFile, onUpload }) => (
    <Stack gap="2rem" align="center" p="5rem" w="auto">
        <Stack gap="0.5rem" align="center">
            <Text fw={700} size="lg">
                Welcome!
            </Text>
            <Text>
                To use this website, you need to have the correct &quot;.csv&quot; report from EKOS.
            </Text>
            <Text>
                Visit Ekos → Reporting → Report named: &quot;Merek&apos;s Data Export&quot; → Export → CSV
            </Text>
            
            <Text>
                Once it has downloaded, upload it here and click Load Data.
            </Text>
        </Stack>
        <FileInput
            value={file}
            onChange={setFile}
            placeholder="Upload your CSV file"
            w="25rem"
        />
        <Button onClick={onUpload} disabled={!file}  w="10rem">
            Load Data
        </Button>
        <Group gap="2rem" p="1rem" justify="center">
            <Image src={"/ReportsSS.png"} alt="EkosReportsHelper" w="40%" bd="1px solid black"/>
            <Text fw="700" size="xl">{">"}</Text>
            <Image src={"/ExportSS.png"} alt="EkosExportHelper" w="20%" bd="1px solid black"/>
        </Group>
    </Stack>
);