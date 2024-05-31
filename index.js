import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import events from 'events';
import spawn from 'cross-spawn';
import dotenv from 'dotenv';

dotenv.config();
events.EventEmitter.defaultMaxListeners = 20;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initialSetup = async () => {
    const designSystem = process.env.DESIGN_SYSTEM;

    if (!designSystem || !['material-ui', 'antd', 'tailwind'].includes(designSystem)) {
        console.error('Invalid design system specified. Must be "material-ui" or "antd".');
        process.exit(1);
    }

    const destDir = path.resolve(__dirname, 'preview');

    try {
        if (fs.existsSync(destDir)) {
            fs.readdirSync(destDir).forEach((file) => {
                if (file !== 'node_modules') {
                    fs.removeSync(path.join(destDir, file));
                }
            });
        } else {
            fs.mkdirSync(destDir);
            console.log('Directory "preview" created successfully.');
        }

        // Define design system specific directories
        const srcDesignSystemDir = path.join(__dirname, 'src', `components-${designSystem === 'antd' ? 'antd' : designSystem === 'tailwind' ? 'tailwind' : 'materialUi'}`);
        const commonHooksDir = path.join(destDir, 'src', 'hooks');
        const componentsDir = path.join(destDir, 'src', 'components');
        const appFileSrc = path.join(srcDesignSystemDir, 'App.tsx');
        const appFileDest = path.join(destDir, 'src', 'App.tsx');
        const designSystemPackageJson = path.join(srcDesignSystemDir, 'package.json');
        const destPackageJson = path.join(destDir, 'package.json');
        const srcThemeDir = path.join(srcDesignSystemDir, 'Themes');
        const destThemeDir = path.join(destDir, 'src', 'utils', 'Themes');

        const necessaryDirs = [
            path.join(destDir, 'public'),
            path.join(destDir, 'src'),
            commonHooksDir,
            componentsDir,
            path.join(destDir, 'src', 'utils')
        ];

        necessaryDirs.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });

        const copyItems = ['public', 'src'];
        for (const item of copyItems) {
            fs.copySync(path.join(__dirname, item), path.join(destDir, item), {
                filter: (src) => {
                    return !src.includes('node_modules')
                        && !src.includes('components-materialUi')
                        && !src.includes('components-antd')
                        && !src.endsWith('package.json')
                        && !src.endsWith('index.js');
                }
            });
        }

        await fs.copy(path.join(srcDesignSystemDir, 'hook'), commonHooksDir);
        await fs.copy(path.join(srcDesignSystemDir, 'pages'), path.join(componentsDir, 'pages'));
        await fs.copy(path.join(srcDesignSystemDir, 'shared-components'), path.join(componentsDir, 'shared-components'));
        await fs.copy(appFileSrc, appFileDest);
        await fs.copy(designSystemPackageJson, destPackageJson);

        fs.mkdirSync(destThemeDir, { recursive: true });

        if (fs.existsSync(srcThemeDir)) {
            await fs.copy(srcThemeDir, destThemeDir, { overwrite: true });
        } else {
            console.warn(`Warning: ${srcThemeDir} does not exist.`);
        }

        const dependencyFiles = [
            'index.html',
            'LICENSE',
            'README.md',
            'tsconfig.json',
            'tsconfig.node.json',
            'vercel.json',
            'vite.config.ts'
        ];

        for (const file of dependencyFiles) {
            const srcPath = path.join(__dirname, file);
            const destPath = path.join(destDir, file);
            if (fs.existsSync(srcPath)) {
                await fs.copy(srcPath, destPath, { overwrite: true });
            }
        }

        process.chdir(destDir);
        const install = spawn.sync('pnpm', ['install'], { stdio: 'inherit' });
        if (install.error) {
            console.error(`Error running pnpm install: ${install.error}`);
            process.exit(1);
        }
        console.log('pnpm install completed successfully.');
    } catch (err) {
        console.error(err);
    }
};

initialSetup();
