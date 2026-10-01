# Website -> Admin MongoDB connection

This website does not connect directly to MongoDB. It calls the SuperAdminRBPL server APIs; the admin server owns the MongoDB credentials and database writes.

Configure the website deployment and local `.env.local` with:

```env
ADMIN_API_BASE_URL=https://admin.rajbiosis.app
NEXT_PUBLIC_WEBSITE_ID=globalbiomedicalsnet
NEXT_PUBLIC_COMPANY_ID=global
```

`ADMIN_API_BASE_URL` must be the actual public base URL where the updated SuperAdminRBPL app is deployed. Do not put `MONGODB_URI` in this website project.

Catalog requests use the Admin `GET /api/catalog` API. Page and district data use Admin `GET /api/site-data`. Contact and product enquiries use Admin `POST /api/public-query` with `type`, `websiteId`, and `data`. Query submissions are only reported as successful when the Admin API confirms the MongoDB write.
