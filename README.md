
# GOLDGEN - Website Deployment Guide

Ce projet est prêt à être déployé sur **Vercel**. Voici la marche à suivre :

## 1. Mettre le code sur GitHub
1. Créez un nouveau dépôt sur [GitHub](https://github.com/new).
2. Initialisez git dans votre dossier local :
   ```bash
   git init
   git add .
   git commit -m "Initial commit - GOLDGEN Website"
   git remote add origin https://github.com/VOTRE_NOM/goldgen.git
   git push -u origin main
   ```

## 2. Déployer sur Vercel
1. Connectez-vous sur [Vercel.com](https://vercel.com).
2. Cliquez sur **"Add New"** > **"Project"**.
3. Importez votre dépôt `goldgen` depuis GitHub.
4. Laissez les paramètres par défaut et cliquez sur **"Deploy"**.

## 3. Configuration de l'API Key (Optionnel)
Si vous utilisez des fonctionnalités avancées de l'API Gemini, allez dans :
`Settings > Environment Variables` sur Vercel et ajoutez `API_KEY` avec votre clé.

---
© 2025 GOLDGEN - Bâtir l'Excellence.
