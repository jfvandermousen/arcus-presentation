# Arcus Partners · Pistes de design

Présentation client : 4 maquettes statiques (HTML / CSS / JS, sans dépendance).

```
index.html      → page d'accueil avec les 4 tuiles
hub.css
thumbs/         → aperçus des tuiles
v1/             → Piste 1 · Institutionnelle
v2/             → Piste 2 · Éditoriale
v3/             → Piste 3 · Immersive
v4/             → Piste 4 · Éditoriale (Arimo, sans le serif de titrage)
```

## Voir en local

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

## Publier sur GitHub Pages

```bash
git init -b main
git add .
git commit -m "Maquettes Arcus Partners - 3 pistes"
gh repo create arcus-maquettes --public --source=. --push
gh api -X POST repos/{owner}/arcus-maquettes/pages -f "source[branch]=main" -f "source[path]=/"
```

URL : `https://<votre-user>.github.io/arcus-maquettes/`

Toutes les pages ont `noindex` : elles ne seront pas référencées par Google.
