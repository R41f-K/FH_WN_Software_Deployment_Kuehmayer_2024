


# ARM Template

This ARM template creates an Azure Storage Account and an Azure Web-App.
The template can be edited with this parameters.

## Parameters:
- **`storageAccountName`**: set a unique name for the Storage Account.
- **`siteName`**: set a unique name for the Function App.
- **`storageAccountType`**: specifies the type of storage account (e.g., `Standard_LRS`, `Premium_LRS`).
- **`location`**: location for the resources, defaulting to the resource group location.

## Deployment Command

To deploy this template, first login to the Azure CLI with the command:

```bash
az login
```

After a succesfull login use the following Azure CLI command to deploy the WebApp and Storage:

```bash
az deployment group create \
    --name myResourceGroup \
    --location westeurope \
    --template-file template.json \
    --parameters 'azuredeploy.parameters.json'
```