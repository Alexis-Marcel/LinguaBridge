import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Dashboard"
        >
            <Head title="Dashboard" />


            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1>Page title</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="section-1-title">
                  <h2 id="section-1-title">
                    {auth.user.name}
                  </h2>
                  <div className=" rounded-lg bg-white shadow">
                    <div className="p-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id eros libero. Praesent porttitor ante nec ultricies gravida. Etiam eget tortor sit amet ex finibus lobortis. Integer eget scelerisque nulla. Nulla eu tortor nibh. Vestibulum pulvinar condimentum ipsum. Nunc condimentum enim mi. Nullam sit amet orci vel velit aliquam tempor ac eu urna. Maecenas eu aliquam augue. Aliquam erat volutpat. Morbi quis tincidunt ligula. Aenean varius rutrum lacus, vel vehicula tortor laoreet sit amet.

Donec bibendum diam id sagittis ultricies. Fusce vitae interdum velit. Etiam interdum id velit vulputate tincidunt. Aenean vehicula velit vitae tortor sagittis tempor. Ut tincidunt sem vitae nulla pretium condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi scelerisque nunc at dolor sagittis luctus sed eu lacus. Donec quis mauris at augue fringilla volutpat a et dolor. Donec finibus orci nec lectus rhoncus suscipit. Maecenas auctor massa sed nunc porttitor, sed tempus diam ornare. Etiam id dui enim. Morbi finibus, diam eu fringilla volutpat, justo leo sollicitudin sapien, vitae varius sem eros non ligula.</div>
                  </div>
                </section>
              </div>

              {/* Right column */}
              <div className="grid grid-cols-1 gap-4">
                <section aria-labelledby="section-2-title">
                  <h2 id="section-2-title">
                    Section title
                  </h2>
                  <div className=" rounded-lg bg-white shadow">
                    <div className="p-6">Your content</div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        
        </AuthenticatedLayout>
    );
}
