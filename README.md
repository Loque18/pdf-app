# PDF App

Frontend for submitting PDF parsing requests, reviewing jobs, previewing source PDFs, and inspecting extracted tables.

## Deploy

1. Create a `.env` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_ENV=dev
```

2. Build and run with Docker:

```bash
docker compose up --build
```

3. Open `https://app.test123.lat`.

## Usage

1. Open `https://app.test123.lat` and create a new parse request from the first column.
2. Upload up to 10 PDF files in one request and send it.
3. Select a request to see its files/jobs in the second column.
4. Select a job to inspect results in the third column.
5. Use the result tabs to switch between PDF preview, JSON output, and rendered HTML tables.
6. Use the sample files in [sample_pdfs](https://github.com/Loque18/pdf-app/tree/main/sample_pdfs) to test the app quickly.
