import Header from '@/components/Header';
import Link from 'next/link';
import withAuth from '@/components/HigherOrderComponent';

interface LayoutProps {
    children?: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
    return (
        <div className="flex">
            <aside className="w-64 bg-gray-800 text-white p-6">
                <h1 className="text-2xl mb-6">Dashboard</h1>
                <nav>
                    <ul>
                        <li>
                            <Link href="/dashboard">
                                <a>Home</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/profile">
                                <a>Profile</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/settings">
                                <a>Settings</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 p-6">
                <Header />
                {children}
            </main>
        </div>
    );
}

export default withAuth(Layout);