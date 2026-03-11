import { DotLoader } from 'react-spinners';

export default function Loading() {
    return (
        <div
            style={{
                backgroundColor: 'transparent',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <DotLoader size={160} color="#36f739" />
        </div>
    );
}
