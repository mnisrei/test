import { Grid } from 'antd';
import { useMemo } from 'react';

const { useBreakpoint } = Grid;

function useGetResponsiveness() {
    const screens = useBreakpoint();

    const isMobile = useMemo(() => screens.xs && !screens.sm, [screens]);
    const isTab = useMemo(() => screens.sm && !screens.md, [screens]);
    const isLowResDesktop = useMemo(() => screens.md && !screens.lg, [screens]);
    const isHighResDesktop = useMemo(() => screens.lg || screens.xl, [screens]);

    return { isMobile, isTab, isLowResDesktop, isHighResDesktop };
}

export default useGetResponsiveness;
