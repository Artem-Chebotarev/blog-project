export type BuildMode = 'production' | 'development';

export interface BuildPaths {
    entry: string;
    build: string;
    html: string;
    src: string;
    locales: string;
    buidLocales: string;
}

export interface BuildEnv {
    mode: BuildMode;
    port: number;
    apiUrl: string;
    analyze: boolean;
}

export interface BuildOptions {
    mode: BuildMode;
    paths: BuildPaths;
    isDev: boolean;
    port: number;
    apiUrl: string;
    analyze: boolean;
    project: 'storybook' | 'frontend' | 'jest';
}
