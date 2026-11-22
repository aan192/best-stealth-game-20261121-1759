// Trash Panda Midnight Gallery - Build Program
// Assembles game assets and generates the make.fun dossier package.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

function packageArtifacts(): void {
  const rootDir = fileURLToPath(new URL('.', import.meta.url));
  const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

  mkdirSync(targetDir, { recursive: true });

  const transferFolder = (folderName: string) => {
    const srcPath = join(rootDir, folderName);
    const destPath = join(targetDir, folderName);
    if (existsSync(srcPath)) {
      mkdirSync(destPath, { recursive: true });
      cpSync(srcPath, destPath, { recursive: true });
    }
  };

  transferFolder('game');
  transferFolder('screenshots');

  const dossierPayload = buildDossier(targetDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    game_max_files: 993,
    game_max_bytes: 50331648,
    game_path_max_bytes: 1000,
  });

  writeFileSync(join(targetDir, 'dossier.json'), dossierPayload);
}

packageArtifacts();
